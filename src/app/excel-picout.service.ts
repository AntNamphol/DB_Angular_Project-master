import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import 'jspdf-autotable';
declare var pdfMake: any;


@Injectable({
  providedIn: 'root'
})
export class ExcelPicoutService {
  picO:any;
  constructor(private http: HttpClient) { }

  public exportToExcel(): void {
    const url = 'http://localhost/backend/export_excel_pic_out.php';
    this.http.get<any[]>(url).subscribe((res: any[]) => {
<<<<<<< Updated upstream
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(res);
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'data.xlsx');
=======
       // Once the poItem data is received, generate the PDF
       this.picO = res;
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
        { text: 'การเบิกออกวัสดุ', style: 'header', alignment: 'center' },

        { text: 'รายการเบิกออก', style: 'header1' },
        {
          table: {
            widths: ['12.5%', '12.5%', '20%', '12.5%','12.5%', '12.5%','20%'], // Column widths
            body: [
              ['ลำดับ', 'รหัสวัสดุ', 'ชื่อวัสดุ', 'จำนวน','หน่วยนับ', 'วันที่เบิก','ผู้ขอเบิก'], // Header row
              // Iterate over poItem data to generate table rows
              ...this.picO.map((item: { material_id: any; material_name: any;unit_name:any; pick_out_material_values: any;pick_out_date:any;username:any;state_name:any;}, index: number) => [
                index + 1, // Sequence number
                item.material_id,
                item.material_name,
                item.pick_out_material_values,
                item.unit_name,
                item.pick_out_date,
              item.username]),
          
            ]
          }
        }
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
>>>>>>> Stashed changes
    });
  }
}
