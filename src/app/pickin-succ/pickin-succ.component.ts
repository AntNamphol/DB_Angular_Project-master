import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { DialogDetailPickComponent } from '../dialog-detail-pick/dialog-detail-pick.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogPickinComponent } from '../dialog-pickin/dialog-pickin.component';


@Component({
  selector: 'app-pickin-succ',
  templateUrl: './pickin-succ.component.html',
  styleUrls: ['./pickin-succ.component.css'],
  providers: [DialogService]
})
export class PickinSuccComponent implements OnInit{
  pick_item_succ:any;
  constructor(private http:HttpClient,public dialogService: DialogService){}
  ngOnInit(): void {
    this.load_item_po_pick_succ();
  }
  load_item_po_pick_succ(){
    this.http.get<any>('http://localhost/backend/load_pick_in_succ.php').subscribe(res =>{
      this.pick_item_succ = res;
    })
  }
  openDetail(po_from_id:number){
    console.log(po_from_id);
    const ref = this.dialogService.open(DialogDetailPickComponent, {
      header: 'รายละเอียดการรับเข้าวัสดุ',
      width: 'auto',
      data: {
        po_from_id
      }
    });
  }

}
