import { HttpClient } from '@angular/common/http';
import { Component ,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username:string='';
  password:string='';
  userFname:string='';
  userLname:string='';
  passwordCon:string='';
  departList:any[]=[];
  selectedDepart: any;
constructor(private http:HttpClient,private router:Router){}

ngOnInit(): void {
  this.load_depart();
}

register() {
  const url ='http://localhost/backend/register.php';
  const data = {
    username: this.username,
    password: this.passwordCon,
    userFname: this.userFname,
    userLname: this.userLname,
    selectedDepart: this.selectedDepart,
  }

  // ตรวจสอบว่าข้อมูลทุกอย่างถูกกรอกครบถ้วนหรือไม่
  if (this.username && this.password && this.userFname && this.userLname && this.selectedDepart) {
    // ส่งข้อมูลไปยังเซิร์ฟเวอร์เพื่อลงทะเบียน
    this.http.post<any>(url, data).subscribe(res  => {
      if(res && res.status == 'scuess'){
        alert('ลงทะเบียนเสร็จสิ้น');
        this.router.navigate(['login']);
      }else{
        alert('ชื่อผู้ใช้นี้ถูกใช้งานแล้ว');
      }
    });
  } else {
    // แสดงข้อความแจ้งเตือนถ้าข้อมูลไม่ครบถ้วน
    alert('กรุณากรอกข้อมูลให้ครบถ้วน');
  }

}

login(){
  this.router.navigate(['login']);
}
load_depart(){
  this.http.get<any[]>('http://localhost/backend/load_depart.php').subscribe( res =>{
    this.departList = res;
  });
}
}
