import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { count } from 'rxjs';

import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-pop-up-edit-comp',
  templateUrl: './pop-up-edit-comp.component.html',
  styleUrls: ['./pop-up-edit-comp.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class PopUpEditCompComponent implements OnInit{
  company_id:any;
  name_comp:string='';
  num_comp:string='';
  email_comp:string='';
  comp_address:string='';
  companies:any[] = [];

  constructor(public config: DynamicDialogConfig,private http:HttpClient,private confirmationService: ConfirmationService, private messageService: MessageService){

  }

  ngOnInit(): void {
    this.company_id = this.config.data.company_id;
    this.load_comp_by_id();
  }

  load_comp_by_id(){
    const url = 'http://localhost/backend/load_comp_by_id.php';
    const headers = { 'Content-Type': 'application/json' };
    const data = { company_id: this.company_id };
    this.http.post<any[]>(url,data,{headers}).subscribe(
      (response) => {
        this.companies = response;
      },
      (error) => {
        console.error('เกิดข้อผิดพลาดในการรับข้อมูล:', error);
      }
    );
  }
  confirm1(event: Event){

    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'ต้องการแก้ไขข้อมูลผู้จัดหาหรือไม่',
      acceptLabel:'ยืนยัน',
      rejectLabel:'ยกเลิก',
      rejectButtonStyleClass:'p-button-outlined',
      accept: () => {
        this.messageService.add({ severity: 'success', summary: 'สำเร็จ', detail: 'บันทึกเสร็จสิ้น', life: 3000 });
        const data = {
          company_id:this.company_id,
          name_comp:this.name_comp,
          email_comp:this.email_comp,
          comp_address:this.comp_address,
          num_comp:this.num_comp,
        };
        const url = 'http://localhost/backend/save_edit_comp.php';
        const headers = { 'Content-Type': 'application/json' };
        this.http.post<any[]>(url,data,{headers}).subscribe(
          (response) => {
            this.companies = response;
            
            const timeout = 1000;
            setTimeout(() => {
              window.location.reload();
            }, timeout);
          },
          (error) => {
            console.error('เกิดข้อผิดพลาดในการรับข้อมูล:', error);
          }
        );
          
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'ยกเลิก', detail: 'ยกเลิกการกระทำ', life: 3000 });
      }
  });


  }

}
