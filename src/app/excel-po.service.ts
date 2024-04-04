import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExcelPoService {

  constructor(private http: HttpClient) { }
  public exportAsExcelFilePo(): void {
    const url = 'http://localhost/backend/export_excel_afb.php';
    this.http.get<any[]>(url).subscribe((res: any[]) => {
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(res);
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      // บันทึกไฟล์ Excel
      XLSX.writeFile(wb, 'รายงานใบสั่งซื้อ.xlsx');
    });
  }
}
