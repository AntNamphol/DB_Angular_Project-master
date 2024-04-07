import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import 'jspdf-autotable';
declare var pdfMake: any;

@Injectable({
  providedIn: 'root'
})
export class PickInReportService {
  picI:any;
  constructor(private http: HttpClient) { }

  public exportToExcelPrdPin(): void {
    const url = 'http://localhost/backend/export_excel_pickin_date.php';
    this.http.get<any[]>(url).subscribe((res: any[]) => {
      this.picI = res;
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
          { text: 'การรับเข้าวัสดุ', style: 'header', alignment: 'center' },
  
          { text: 'รายการรับเข้า', style: 'header1' },
          {
            table: {
              widths: ['12.5%', '12.5%', '12.5%', '12.5%','12.5%', '12.5%','12.5%', '12.5%'], // Column widths
              body: [
                ['ลำดับ', 'รหัสวัสดุ', 'ชื่อวัสดุ', 'จำนวน','หน่วยนับ','เลขใบสั่งซื้อ', 'ผู้รับเข้า','วันที่'], // Header row
                // Iterate over poItem data to generate table rows
                ...this.picI.map((item: { material_id: any; material_name: any;unit_name:any; pick_in_values: any;pick_in_date:any;username:any;state_name:any;po_from_id:any;}, index: number) => [
                  index + 1, // Sequence number
                  item.material_id,
                  item.material_name,
                  item.pick_in_values,
                  item.unit_name,
                  item.po_from_id,
                  item.username,
                item.pick_in_date]),
            
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
    });
  }
}
