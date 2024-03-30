import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  username:any;
  email:any;

  constructor(private http:HttpClient){}
  ngOnInit(): void {
    
  }
  send(){
    const url = 'http://localhost/backend/forgotpass.php';
    const data = {username:this.username,email:this.email};
    this.http.post<any>(url,data).subscribe(res =>{
      
    });
  }
}
