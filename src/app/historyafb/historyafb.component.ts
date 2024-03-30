import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { DialogAfbComponent } from '../dialog-afb/dialog-afb.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-historyafb',
  templateUrl: './historyafb.component.html',
  styleUrls: ['./historyafb.component.css'],
  providers: [DialogService]
})
export class HistoryafbComponent implements OnInit{
  userId:any;
  userLv:any;
  afborder:any;
  afbData: any[] = [];
  afborderFiltered: any[] = []; // ข้อมูลที่ถูกกรอง
  searchAfbId: string='';
  constructor(private http:HttpClient,private dialogService: DialogService){

  }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('user_id');
    this.userLv = sessionStorage.getItem('userlv_id');
    this.load_afb()
  }

  load_afb(): void {
    const data = { userId: this.userId };
    const url = 'http://localhost/backend/load_afb_his.php';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post(url, data, { headers }).subscribe(
      (response: any) => {
        console.log('ตอบกลับจากเซิร์ฟเวอร์:', response);
        this.afbData = response.map((item: { afb_from_id: any; user_id: any; afb_comment: any; afb_date: any; state_id: any; afb_item_id: any; material_id: any; material_name: any; afb_item_values: any; user_fullname: any; userdepart_name: any; }) => ({ afbId: item.afb_from_id, userId: item.user_id,afb_comment: item.afb_comment,afb_date:item.afb_date,state_id:item.state_id,afb_item_id:item.afb_item_id,material_id:item.material_id,material_name:item.material_name,afb_item_values:item.afb_item_values,userFullname:item.user_fullname,userdepart_name:item.userdepart_name }));
      },
      (error) => {
        console.error('เกิดข้อผิดพลาดในการส่งข้อมูล:', error);
      }
    );
  }
  approveButtonClicked(afbId: any) {
    // ทำสิ่งที่คุณต้องการกับ afbId ที่ได้รับที่นี่ เช่น เปิดกราฟ
    console.log("afbId:", afbId);
    // เปิดกราฟหรือทำสิ่งอื่นๆตามต้องการ
    const ref = this.dialogService.open(DialogAfbComponent, {
      header: 'ตรวจสอบเพื่ออนุมัติ',
      width: '70%',
      data: {
        afbId: afbId
      }
    });
  
    ref.onClose.subscribe((result) => {
      console.log('Dialog closed:', result);
      // ทำสิ่งที่ต้องการเมื่อ Dialog ถูกปิด
    });
  }
  detailButtonClicked(afbId: any) {
    // ทำสิ่งที่คุณต้องการกับ afbId ที่ได้รับที่นี่ เช่น เปิดกราฟ
    console.log("afbId:", afbId);
    // เปิดกราฟหรือทำสิ่งอื่นๆตามต้องการ
    const ref = this.dialogService.open(DialogAfbComponent, {
      header: 'ตรวจสอบเพื่ออนุมัติ',
      width: '70%',
      data: {
        afbId: afbId
      }
    });
  
    ref.onClose.subscribe((result) => {
      console.log('Dialog closed:', result);
      // ทำสิ่งที่ต้องการเมื่อ Dialog ถูกปิด
    });
  }
    searchAfbIdChange(afbId: string) {
    this.afborderFiltered = this.afbData.filter((item: { afbId: string | string[]; }) => item.afbId.includes(afbId));
  }
}
