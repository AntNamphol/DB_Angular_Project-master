import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import 'jspdf-autotable';
declare var pdfMake: any;


@Injectable({
  providedIn: 'root'
})
export class TotalItemService {
  items:any;
  constructor(private http: HttpClient) { }

  public exportToExcelPrd(): void {
    const url = 'http://localhost/backend/export_excel_total_item.php';
    this.http.get<any[]>(url).subscribe((res: any[]) => {
      this.items = res;
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
          { text: 'รายการวัสดุคงคลัง', style: 'header', alignment: 'center' },
  
          { text: 'รายการวัสดุ', style: 'header1' },
          {
            table: {
              widths: ['11.11%', '11.11%', '11.11%', '11.11%','11.11%', '11.11%','11.11%', '11.11%', '11.11%'], // Column widths
              body: [
                ['ลำดับ', 'รหัสวัสดุ', 'ชื่อวัสดุ', 'จำนวนคงเหลือ','หน่วยนับ','ประเภท', 'ช่องวาง','ชั้นวาง','แถววาง'], // Header row
                // Iterate over poItem data to generate table rows
                ...this.items.map((item: { material_id: any; material_name: any;unit_name:any; material_value: any;material_row_name:any;material_slot_name:any;state_name:any;material_type_name:any;material_class_shelf_name:any}, index: number) => [
                  index + 1, // Sequence number
                  item.material_id,
                  item.material_name,
                  item.material_value,
                  item.unit_name,
                  item.material_type_name,
                  item.material_slot_name,
                  item.material_class_shelf_name,
                item.material_row_name]),
            
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
