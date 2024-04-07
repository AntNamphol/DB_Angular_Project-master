import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogEditSlotComponent } from '../dialog-edit-slot/dialog-edit-slot.component';


@Component({
  selector: 'app-slot-item',
  templateUrl: './slot-item.component.html',
  styleUrls: ['./slot-item.component.css'],
  providers: [ConfirmationService, MessageService,DialogService]
})
export class SlotItemComponent implements OnInit{
  slot:any;
  visible:boolean = false;
  slotNew:string='';
  row:any;
  selectedRow:string='';
  chanWang:any;
  selectedchanWang:string='';
  constructor(private http:HttpClient,private dialogService: DialogService,private confirmationService: ConfirmationService, private messageService: MessageService){}
  ngOnInit(): void {
    this.load_slot();
    this.load_row();
    this.load_chanwang();
  }
  load_chanwang(){
    this.http.get<any[]>('http://localhost/backend/load_chanwang.php').subscribe(response =>{
      this.chanWang = response;
    });
  }
  load_slot(){
    this.http.get<any[]>('http://localhost/backend/load_slot.php').subscribe(response =>{
      this.slot = response;
    });
  }
  showDialog(){
    this.visible = true;
  }
  confirm() {
    this.confirmationService.confirm({
        header: 'ต้องการบันทึกหรือไม่?',
        message: 'โปรดตรวจสอบให้แน่ใจ',
        acceptLabel:'ยืนยัน',
        rejectLabel:'ยกเลิก',
        rejectButtonStyleClass:'p-button-outlined',
        accept: () => {
            const url = 'http://localhost/backend/add_slot.php';
            const data = {
              slotNew:this.slotNew,
              selectedRow:this.selectedRow,
              selectedchanWang:this.selectedchanWang
            };
            this.http.post<any>(url,data).subscribe(
                (res) => {
                    if (res && res.status === 'success') {
                        this.messageService.add({ severity: 'success', summary: 'สำเร็จ', detail: 'เพิ่มช่องวางเสร็จสิ้น', life: 3000 });
                        this.visible = false;
                        this.load_slot();
                    } else {
                        this.messageService.add({ severity: 'error', summary: 'ไม่สำเร็จ', detail: 'มีช่องวางนี้อยู่แล้ว', life: 3000 });
                    }
                },
                (error) => {
                    console.log(error);
                    this.messageService.add({ severity: 'error', summary: 'ไม่สำเร็จ', detail: 'มีข้อผิดพลาดในการส่งคำขอ', life: 3000 });
                }
            );
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'ยกเลิก', detail: 'ยกเลิกการกระทำ', life: 3000 });
        }
    });
}
load_row(){
  this.http.get<any[]>('http://localhost/backend/load_row.php').subscribe(response =>{
    this.row = response;
  });
}

editslot(material_slot_id:number,material_class_shelf_id:number,material_row_id:number){
      const ref = this.dialogService.open(DialogEditSlotComponent, {
        header: 'แก้ไขช่องวางของ',
        width: 'auto',
        data: {
          material_slot_id: material_slot_id,
          material_class_shelf_id:material_class_shelf_id,
          material_row_id:material_row_id
        }
      });
    
      ref.onClose.subscribe((result) => {
        console.log('Dialog closed:', result);
        // ทำสิ่งที่ต้องการเมื่อ Dialog ถูกปิด
      });
}

confirm1(event: Event,material_slot_id:number) {
  this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'ต้องการลบช่องวางของหรือไม่?',
      header: 'ทบทวนการกระทำ',
      acceptLabel:'ยืนยัน',
      rejectLabel:'ยกเลิก',
      rejectButtonStyleClass:'p-button-outlined',
      accept: () => {
        const url = 'http://localhost/backend/del_slot.php';
        const data = { material_slot_id };
        this.http.post<any>(url, data).subscribe(res => {
          if (res && res.status === 'success') {
            this.messageService.add({ severity: 'success', summary: 'สำเร็จ', detail: 'ลบช่องวางของสำเร็จ', life: 3000 });
            this.load_slot();
          } else {
            this.messageService.add({ severity: 'error', summary: 'เกิดข้อผิดพลาด', detail: 'ช่องวางของนี้มีการใช้งานอยู่', life: 3000 });
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'ยกเลิก', detail: 'ยกเลิกการกระทำ', life: 3000 });
      }
  });
}
}
