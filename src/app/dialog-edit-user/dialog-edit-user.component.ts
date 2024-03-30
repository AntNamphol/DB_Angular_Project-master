import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ConfirmationService,MessageService } from 'primeng/api';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.css'],
  providers: [ConfirmationService,MessageService]
})
export class DialogEditUserComponent implements OnInit{
  user_id: any;
  userEditAll:any;
  edit_user_name:string='';
  edit_user_password:string='';
  edit_user_Fname:string='';
  edit_user_Lname:string='';
  edit_user_Nump:string='';
  edit_user_Age:string='';
  edit_user_lv:string='';
  lv:any;
  selectLv:string='';
  constructor(private http: HttpClient, public config: DynamicDialogConfig, public ref: DynamicDialogRef, private confirmationService: ConfirmationService, private messageService: MessageService) {

  }
  ngOnInit(): void {
    this.user_id = this.config.data.user_id;
    this.load_user_by_id();
    this.load_userLv();
  }
  load_user_by_id(){
    const url = 'http://localhost/backend/load_user_by_id.php';
    const data = {user_id:this.user_id};
    this.http.post<any>(url,data).subscribe(res =>{
      this.userEditAll = res;

    });
  }
  load_userLv(){
    this.http.get<any>('http://localhost/backend/load_user_lv_edit.php').subscribe(res =>{
      this.lv = res;
    });
  }
  save(){
    const url = 'http://localhost/backend/edit_user.php';
    const data = {
      user_id:this.user_id,
      edit_user_name:this.edit_user_name,
      edit_user_password:this.edit_user_password,
      edit_user_Fname:this.edit_user_Fname,
      edit_user_Lname:this.edit_user_Lname,
      edit_user_Nump:this.edit_user_Nump,
      edit_user_Age:this.edit_user_Age,
      selectLv:this.selectLv
    };
    this.http.post<any>(url,data).subscribe((res) => {
      if (res && res.status === 'success') {
        this.messageService.add({ severity: 'success', summary: 'สำเร็จ', detail: 'แก้ไขสำเร็จ', life: 3000 });
        window.location.reload();
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'แก้ไขไม่สำเร็จ', life: 3000 });
      }
    }, (error) => {
      console.log(error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'เกิดข้อผิดพลาดในการส่งข้อมูล', life: 3000 });
    });
      }

  }

