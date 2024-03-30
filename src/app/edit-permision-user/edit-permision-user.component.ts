import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';




@Component({
  selector: 'app-edit-permision-user',
  templateUrl: './edit-permision-user.component.html',
  styleUrls: ['./edit-permision-user.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class EditPermisionUserComponent implements OnInit{
  userPic:any[]=[];
  constructor(private http:HttpClient,private confirmationService: ConfirmationService, private messageService: MessageService){

  }
  ngOnInit(): void {
    this.load_user_pic();
  }
  load_user_pic(){
    this.http.get<any>('http://localhost/backend/load_user_all.php').subscribe(res =>{
      this.userPic = res;
    });
  }
  delUser(event:Event,user_id:number){
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'ต้องการลบผู้ใช้นี้หรือไม่',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      rejectIcon:"none",
      rejectButtonStyleClass:"p-button-text",
      accept: () => {
        const url = 'http://localhost/backend/del_user.php';
        const data = {user_id}
        this.http.post<any>(url,data).subscribe(res => {
          this.load_user_pic();
        });
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
  });
  }
  
}
