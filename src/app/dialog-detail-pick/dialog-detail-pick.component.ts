import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dialog-detail-pick',
  templateUrl: './dialog-detail-pick.component.html',
  styleUrls: ['./dialog-detail-pick.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class DialogDetailPickComponent implements OnInit {
  po_from_id:any;
  pick_detail:any;
  constructor(private http:HttpClient,public config: DynamicDialogConfig,public ref: DynamicDialogRef,private confirmationService: ConfirmationService, private messageService: MessageService,private router:Router){

  }

  ngOnInit(): void {
    this.po_from_id = this.config.data.po_from_id;
    this.load_pick_detail();
  }

  load_pick_detail(){
    const url = 'http://localhost/backend/load_pick_detail.php';
    const data = {po_from_id:this.po_from_id}
    this.http.post<any>(url,data).subscribe(res=>{
      this.pick_detail = res;
    });
  }
}