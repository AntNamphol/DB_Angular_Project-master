import { HttpClient } from '@angular/common/http';
import { Component,OnInit} from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogPoDetialComponent } from '../dialog-po-detial/dialog-po-detial.component';
import "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import 'jspdf-autotable';
declare var pdfMake: any;



interface PurchaseOrder {
  po_from_id: string;
  po_date: string;
  company_name: string;
  state_name: string;
  userFullname: string;
  user_id: string;
}


@Component({
  selector: 'app-po-state',
  templateUrl: './po-state.component.html',
  styleUrls: ['./po-state.component.css'],
  providers: [DialogService]
})
export class PoStateComponent implements OnInit{
  poList:any;
  filteredPoList: any[] = []; // ตัวแปรที่เก็บข้อมูลใบสั่งซื้อที่ผ่านการกรอง
  searchPoFromId: string = ''; // ตัวแปรสำหรับค้นหารหัสใบสั่งซื้อ
  searchPoDate: string = ''; // ตัวแปรสำหรับค้นหาด้วยวันที่สั่งซื้อ
  searchUserFullname: string = ''; // ตัวแปรสำหรับค้นหาด้วยชื่อผู้สั่งซื้อ
  poItem:any;
  constructor(private http:HttpClient,private dialogService: DialogService){
    this.filteredPoList = this.poList;
  }
  ngOnInit(): void {
    this.load_po();
  }
  load_po(){
    this.http.get<any[]>('http://localhost/backend/load_po.php')
      .subscribe(response => {
        this.poList = response;
      });
  }
  detailButtonClicked(po_from_id: any){
    console.log(po_from_id);
    const ref = this.dialogService.open(DialogPoDetialComponent, {
      header: 'รายละเอียดใบสั่งซื้อ',
      width: '100vw',
      data: {
        po_from_id: po_from_id
      }
    });
  
    ref.onClose.subscribe((result) => {
      console.log('Dialog closed:', result);
      // ทำสิ่งที่ต้องการเมื่อ Dialog ถูกปิด
    });
  }
  search() {
    this.filteredPoList = this.poList.filter((po: PurchaseOrder) => {
        const matchPoFromId = po.po_from_id.toString().includes(this.searchPoFromId);
        const matchPoDate = po.po_date.includes(this.searchPoDate);
        const matchUserFullname = po.userFullname.toLowerCase().includes(this.searchUserFullname.toLowerCase());
        return matchPoFromId && matchPoDate && matchUserFullname;
    });

    // Check if no items are found
    if (this.filteredPoList.length === 0) {
        // Handle the case where no items are found, e.g., display a message
        console.log('No items found.');
    }
}
exportPdf(po_from_id: number) {
  const url = 'http://localhost/backend/export_po_pdf.php';
  const data = { po_from_id };

  // Fetch poItem data from the server
  this.http.post<any>(url, data).subscribe(res => {
    this.poItem = res;
    const row = this.poItem[0];
    const company = row.company_name;
    const po_user_name = row.po_user_name;

    // Calculate the total price
    let totalPrice = 0;
    this.poItem.forEach((item: any) => {
      totalPrice += item.item_values * item.item_price;
    });

    // Once the poItem data is received, generate the PDF
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.fonts = {
      Roboto: {
        normal: 'THSarabun.ttf',
        bold: 'THSarabun Bold.ttf',
        italics: 'THSarabun Italic.ttf',
        bolditalics: 'THSarabun Bold Italic.ttf'
      }
    };

    // Define the content of the PDF document
    const documentDefinition = {
      content: [
        { text: 'ชื่อบริษัท', style: 'header', alignment: 'center' },
        { text: 'ที่อยู่', style: 'header1', alignment: 'center' },
        { text: 'เบอร์โทร-โทรสาร-เลขประจำตัวผู้เสียภาษี', style: 'header1', alignment: 'center' },
        { text: 'ใบสั่งซื้อ', style: 'header2', alignment: 'center' },
        { text: '\n' },
        { text: 'สั่งซื้อจาก', style: 'subheader' },
        { text: company, style: 'subheader' },
        { text: 'ผู้สั่งซื้อ', style: 'subheader' },
        { text: po_user_name, style: 'subheader' },

        { text: 'รายการสั่งซื้อ', style: 'header1' },
        {
          table: {
            widths: ['10%', '25%', '20%', '20%', '25%'], // Column widths
            body: [
              ['ลำดับ', 'รหัสวัสดุ', 'ชื่อวัสดุ', 'จำนวน', 'ราคาต่อหน่วย'], // Header row
              // Iterate over poItem data to generate table rows
              ...this.poItem.map((item: { material_id: any; material_name: any; item_values: any; item_price: any }, index: number) => [
                index + 1, // Sequence number
                item.material_id,
                item.material_name,
                item.item_values,
                item.item_price
              ])
            ]
          }
        },
        { text: `ราคารวมทั้งสิ้น: ${totalPrice} บาท` , alignment: 'right', margin: [0, 20, 0, 0],style: 'subheader' } // Total price
      ],
      styles: {
        header: {
          fontSize: 24,
          bold: true,
          alignment: 'center'
        },
        header1: {
          fontSize: 16,
          bold: false,
          alignment: 'center'
        },
        header2: {
          fontSize: 24,
          bold: true,
          alignment: 'center'
        },
        subheader: {
          fontSize: 16,
          bold: false
        },
        body1: {
          fontSize: 16
        }
      }
    };

    // Generate and open the PDF
    pdfMake.createPdf(documentDefinition).open();
  });
}


}
