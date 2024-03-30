import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(private http: HttpClient) { }

  public exportAsExcelFile(): void {
    const url = 'http://localhost/backend/export.php';
    this.http.get<any[]>(url).subscribe((res: any[]) => {
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      const sheets: { [key: string]: any[] } = {};
  
      // แบ่งข้อมูลตาม material_class_shelf_id
      res.forEach(item => {
        const shelfId = item.material_class_shelf_id;
        if (!sheets[shelfId]) {
          sheets[shelfId] = [];
        }
        sheets[shelfId].push(item);
      });
  
      // เขียนข้อมูลลงในแต่ละ WorkSheet
      Object.keys(sheets).forEach((key, index) => {
        const wsName = 'Sheet' + (index + 1);
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(sheets[key]);
        XLSX.utils.book_append_sheet(wb, ws, wsName);
      });
  
      // บันทึกไฟล์ Excel
      XLSX.writeFile(wb, 'materials.xlsx');
    });
  }
  
}
