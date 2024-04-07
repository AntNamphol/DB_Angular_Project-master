import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';

@Component({
  selector: 'app-dialog-pickin',
  templateUrl: './dialog-pickin.component.html',
  styleUrls: ['./dialog-pickin.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class DialogPickinComponent implements OnInit{

  po_id:any;
  afb_item_id:any;
  material_id:any;
  item_values:any;
  pick_items:any;
  pickin_values:any;
  editPrd:any;
  unitId:any;
  isDropdownDisabled: boolean = true;
  typeId:any;
  chanWang:any;
  selectedchanWang:any;
  selectedType:any;
  userId:any;


  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private http: HttpClient,
    private confirmationService: ConfirmationService, 
    private messageService: MessageService
  ){

  }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('user_id');
    this.po_id = this.config.data.po_id;
    this.afb_item_id = this.config.data.afb_item_id;
    this.material_id = this.config.data.material_id;
    this.item_values = this.config.data.item_values;
    this.load_item_po_pick_by_id();

  }
  load_item_po_pick_by_id(){
    const url = 'http://localhost/backend/load_item_po_pick_by_id.php';
    const data = {
      afb_item_id:this.afb_item_id
    };
    this.http.post<any>(url,data).subscribe(res =>{
      this.pick_items = res;
    })
  }
  save(po:any,event:Event){
    const url = 'http://localhost/backend/save_pick_in.php';
    const data = {po,pickin_values:this.pickin_values,userId:this.userId};
    if(this.pickin_values != undefined){
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        header: 'ยืนยันจำนวนรับเข้าใช่หรือไม่?',
        acceptLabel:'ยืนยัน',
        rejectLabel:'ยกเลิก',
        rejectButtonStyleClass:'p-button-outlined',
        accept: () => {
          console.log(po);
          console.log(data);
          this.http.post<any>(url,data).subscribe(res=>{
            console.log(res);
            this.load_item_po_pick_by_id();
            this.messageService.add({ severity: 'info', summary: 'สำเร็จ', detail: 'รับเข้าวัสดุเสร็จสิ้น' });
            window.location.reload();
          });
            
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'ยกเลิก', detail: 'ยกเลิกการกระทำ', life: 3000 });
        }
    });
      
    }else{
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
    
    
  }


}
