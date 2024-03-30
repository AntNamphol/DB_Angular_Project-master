import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogPickinComponent } from '../dialog-pickin/dialog-pickin.component';





@Component({
  selector: 'app-pick-in-order',
  templateUrl: './pick-in-order.component.html',
  styleUrls: ['./pick-in-order.component.css'],
  providers: [DialogService]
})
export class PickInOrderComponent implements OnInit{
  pick_item:any[]=[];

  constructor(private http:HttpClient,public dialogService: DialogService){}

  ngOnInit(): void {
    this.load_item_po_pick();
  }
  load_item_po_pick(){
    this.http.get<any>('http://localhost/backend/load_pick_in.php').subscribe(res =>{
      this.pick_item = res;
    })
  }
  openCheckin(afb_item_id:number,material_id:number,po_id:number,item_values:number){
    console.log(afb_item_id,material_id,po_id,item_values);
    const ref = this.dialogService.open(DialogPickinComponent, {
      header: 'จำนวนรับเข้า',
      width: 'auto',
      data: {
        afb_item_id: afb_item_id,
        material_id:material_id,
        po_id:po_id,
        item_values:item_values
      }
    });
  
    ref.onClose.subscribe((result) => {
      console.log('Dialog closed:', result);
      // ทำสิ่งที่ต้องการเมื่อ Dialog ถูกปิด
    });
  }

  
}
