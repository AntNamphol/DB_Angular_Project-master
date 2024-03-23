import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { DialogAfbComponent } from '../dialog-afb/dialog-afb.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';



@Component({
  selector: 'app-afb-state',
  templateUrl: './afb-state.component.html',
  styleUrls: ['./afb-state.component.css'],
  providers: [DialogService]
})
export class AfbStateComponent implements OnInit{

  userLv:any;
  searchAfbId: string='';
  afborder: any[] = []; // ข้อมูลทั้งหมด
  afborderFiltered: any[] = []; // ข้อมูลที่ถูกกรอง
  showTable: boolean = false;

  constructor(private http:HttpClient,private dialogService: DialogService){}
  ngOnInit(): void {
    this.load_afb();
    this.userLv = sessionStorage.getItem('userlv_id');
    
  }
  load_afb(){
    this.http.get<any[]>('http://localhost/backend/load_afb.php')
    .subscribe(response => {
      this.afborder = response.map(item => ({ afbId: item.afb_from_id, userId: item.user_id,afb_comment: item.afb_comment,afb_date:item.afb_date,state_id:item.state_id,afb_item_id:item.afb_item_id,material_id:item.material_id,material_name:item.material_name,afb_item_values:item.afb_item_values,userFullname:item.user_fullname,userdepart_name:item.userdepart_name }));
    });
  }
  approveButtonClicked(afbId: any) {
    // ทำสิ่งที่คุณต้องการกับ afbId ที่ได้รับที่นี่ เช่น เปิดกราฟ
    console.log("afbId:", afbId);
    // เปิดกราฟหรือทำสิ่งอื่นๆตามต้องการ
    const ref = this.dialogService.open(DialogAfbComponent, {
      header: 'รายละเอียด',
      width: '100vw',
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
      header: 'รายละเอียด',
      width: '100vw',
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
    this.afborderFiltered = this.afborder.filter(item => item.afbId.includes(afbId));
  }
  
  
}
