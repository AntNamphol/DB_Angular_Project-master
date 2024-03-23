import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';



@Component({
  selector: 'app-dialog-po-detial',
  templateUrl: './dialog-po-detial.component.html',
  styleUrls: ['./dialog-po-detial.component.css']
})
export class DialogPoDetialComponent implements OnInit{
  po_from_id:any;
  podetail:any[]=[];
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private http: HttpClient,
  ){}

  ngOnInit(): void {
    this.po_from_id = this.config.data.po_from_id;
    this.load_po_detail();
  }

  load_po_detail(){
    const url = 'http://localhost/backend/load_po_deail.php'
    const data = {po_from_id:this.po_from_id}
    this.http.post<any[]>(url,data)
      .subscribe(response => {
        this.podetail = response;
      });
  }
}
