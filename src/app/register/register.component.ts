import { HttpClient } from '@angular/common/http';
import { Component ,OnInit } from '@angular/core';
import { Router } from '@angular/router';


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
  age:string='';
  nump:string='';
  departList:any[]=[];
  selectedDepart: any;
constructor(private http:HttpClient,private router:Router){}

ngOnInit(): void {
  this.load_depart();
}

register(){
  const url ='http://localhost/backend/register.php';
  const data = {
    username:this.username,
    password:this.password,
    userFname:this.userFname,
    userLname:this.userLname,
    age:this.age,
    nump:this.nump,
    selectedDepart: this.selectedDepart
  }
  if(this.username != '' && this.password != '' && this.userFname != '' && this.userLname != '' && this.age != '' && this.nump != '' && this.selectedDepart != ''){
    this.http.post<any>(url,data).subscribe(res =>{

    });
  }else{
    alert('กรุณากรอกข้อมูลให้ครบถ้วน');
  }

  console.log(data);
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
