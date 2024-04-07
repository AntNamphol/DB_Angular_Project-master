import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';




@Component({
  selector: 'app-edit-permision-user',
  templateUrl: './edit-permision-user.component.html',
  styleUrls: ['./edit-permision-user.component.css'],
  providers: [ConfirmationService, MessageService,DialogService]
})
export class EditPermisionUserComponent implements OnInit{
  userPic:any[]=[];
  visible:boolean = false;
  username:string='';
  password:string='';
  userFname:string='';
  userLname:string='';
  departList:any[]=[];
  selectedDepart: any;
  searchUser:string='';
  UserAll:any;
  
  constructor(private http:HttpClient,private confirmationService: ConfirmationService, private messageService: MessageService,private dialogService: DialogService){

  }
  ngOnInit(): void {
    this.load_user_pic();
    this.load_depart();
  }
  searchAfbIdChange(userFullname: string) {
    this.UserAll = this.userPic.filter(item => item.userFullname.includes(userFullname));
    console.log(this.UserAll);
  }
  
  showDialog(){
    this.visible = true;
  }
  load_user_pic(){
    this.http.get<any>('http://localhost/backend/load_user_all.php').subscribe(res =>{
      this.userPic = res;
    });
  }
  load_depart(){
    this.http.get<any[]>('http://localhost/backend/load_depart.php').subscribe( res =>{
      this.departList = res;
    });
  }
  register() {
    const url ='http://localhost/backend/register.php';
    const data = {
      username: this.username,
      password: this.password,
      userFname: this.userFname,
      userLname: this.userLname,
      selectedDepart: this.selectedDepart,
    }
  
    // ตรวจสอบว่าข้อมูลทุกอย่างถูกกรอกครบถ้วนหรือไม่
    if (this.username && this.password && this.userFname && this.userLname && this.selectedDepart) {
      // ส่งข้อมูลไปยังเซิร์ฟเวอร์เพื่อลงทะเบียน
      this.http.post<any>(url, data).subscribe(res  => {
        if(res && res.status == 'scuess'){
          alert('เพิ่มผู้ใช้งานสำเร็จ');
          this.load_user_pic();
        }else{
          alert('ชื่อผู้ใช้นี้ถูกใช้งานแล้ว');
        }
      });
    } else {
      // แสดงข้อความแจ้งเตือนถ้าข้อมูลไม่ครบถ้วน
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
  
  }
  delUser(event:Event,user_id:number){
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'ต้องการลบผู้ใช้นี้หรือไม่',
      header: 'ทบทวนการกระทำ',
      acceptLabel:'ยืนยัน',
      rejectLabel:'ยกเลิก',
      rejectButtonStyleClass:'p-button-outlined',
      accept: () => {
        const url = 'http://localhost/backend/del_user.php';
        const data = {user_id}
        this.http.post<any>(url,data).subscribe(res => {
          this.load_user_pic();
        });
          this.messageService.add({ severity: 'info', summary: 'สำเร็จ', detail: 'ลบผู้ใช้เสร็จสิ้น' });
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'ยกเลิก', detail: 'ยกเลิกการกระทำ', life: 3000 });
      }
  });
  }
  editUser(user_id:number){
    const ref = this.dialogService.open(DialogEditUserComponent, {
      header: 'แก้ไขผู้ใช้งาน',
      width: '95vw',
      height:'auto',
      data: {
        user_id: user_id
      }
    });
  
    ref.onClose.subscribe((result) => {
      console.log('Dialog closed:', result);
      // ทำสิ่งที่ต้องการเมื่อ Dialog ถูกปิด
    });
  }
  
}
