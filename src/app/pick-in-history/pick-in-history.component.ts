import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';


@Component({
  selector: 'app-pick-in-history',
  templateUrl: './pick-in-history.component.html',
  styleUrls: ['./pick-in-history.component.css']
})
export class PickInHistoryComponent implements OnInit{
  picC:any[]=[];
  constructor(private http:HttpClient){}
  ngOnInit(): void {
    this.load_pic();
  }
  load_pic(){
    this.http.get<any>('http://localhost/backend/load_pic.php').subscribe(res =>{
      this.picC = res;
    });
  }


}
