import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';


@Injectable({
  providedIn: 'root'
})
export class PickInReportService {

  constructor(private http: HttpClient) { }

  public exportToExcelPrdPin(): void {
    const url = 'http://localhost/backend/export_excel_pickin_date.php';
    this.http.get<any[]>(url).subscribe((res: any[]) => {
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(res);
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'รายงานการรับเข้าวัสดุ.xlsx');
    });
  }
}
