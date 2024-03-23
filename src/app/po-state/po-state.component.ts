import { HttpClient } from '@angular/common/http';
import { Component,OnInit} from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogPoDetialComponent } from '../dialog-po-detial/dialog-po-detial.component';

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

}
