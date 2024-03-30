import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
[x: string]: any;
  username: string | null = null; // Initialize with null or empty string, depending on your preference
  orDerl:any;
  wait:any;
  comp:any;
  user:any;
  data: any;

  options: any;
  chartData: any;
  pr:any;
  userLv:any;
  afb:any;
  afbC:any;
  po:any;
  poC:any;
  prd:any;
  prdNoy:any;
  lorRub:any;
  constructor( private http:HttpClient) {}

  ngOnInit(): void {
    // Check if the session username is available
    this.username = sessionStorage.getItem('username');
    this.userLv = sessionStorage.getItem('userlv_id');
    if (!this.username) {
      // Session username not available, redirect to the login page or perform any other action
      // Example: Redirect to the login page
      window.location.href = '/login';
    }

    if(this.userLv == 4){
      this.load_afb();
      this.load_afb_con();
      this.load_po();
      this.load_po_con();
    }
    if(this.userLv == 3){
      this.load_prd();
      this.load_prdnoy();
      this.load_lorRub();
    }
    

    

  }
  load_afb(){
    this.http.get('http://localhost/backend/select_afb_numrow.php').subscribe(res =>{
      this.afb = res;
      console.log(this.afb);
    });
  }
  load_afb_con(){
    this.http.get('http://localhost/backend/select_afb_numrow_con.php').subscribe(res =>{
      this.afbC = res;
      console.log(this.afb);
    });
  }
  load_po(){
    this.http.get('http://localhost/backend/select_po_numrow.php').subscribe(res =>{
      this.po = res;
      console.log(this.afb);
    });
  }
  load_po_con(){
    this.http.get('http://localhost/backend/select_po_numrow_con.php').subscribe(res =>{
      this.poC = res;
      console.log(this.afb);
    });
  }

  load_prd(){
    this.http.get('http://localhost/backend/select_prd_numrow.php').subscribe(res =>{
      this.prd = res;
      console.log(this.afb);
    });
  }
  load_prdnoy(){
    this.http.get('http://localhost/backend/select_po_numrow_noy.php').subscribe(res =>{
      this.prdNoy = res;
      console.log(this.afb);
    });
  }
  load_lorRub(){
    this.http.get('http://localhost/backend/select_lorrun_numrow.php').subscribe(res =>{
      this.lorRub = res;
      console.log(this.afb);
    });
  }
}

  


