import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialohEditTypeComponent } from '../dialoh-edit-type/dialoh-edit-type.component';




@Component({
  selector: 'app-type-item',
  templateUrl: './type-item.component.html',
  styleUrls: ['./type-item.component.css'],
  providers: [ConfirmationService, MessageService,DialogService]
})
export class TypeItemComponent implements OnInit {
  chanWang:any;
  visible:boolean = false;
  typeNew:string='';
  constructor(private http:HttpClient,private dialogService: DialogService,private confirmationService: ConfirmationService, private messageService: MessageService){}
  ngOnInit(): void {
    this.load_chanwang();
    
  }
  load_chanwang(){
    this.http.get<any[]>('http://localhost/backend/load_type.php').subscribe(response =>{
      this.chanWang = response;
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
            const url = 'http://localhost/backend/add_type.php';
            const data = {typeNew:this.typeNew};
            this.http.post<any>(url,data).subscribe(
                (res) => {
      
                    if (res && res.status === 'success') {
                        this.messageService.add({ severity: 'success', summary: 'สำเร็จ', detail: 'เพิ่มประเภทเสร็จสิ้น', life: 3000 });
                        this.visible = false;
                        this.load_chanwang();
                    } else {
                        this.messageService.add({ severity: 'error', summary: 'ไม่สำเร็จ', detail: 'มีประเภทนี้อยู่แล้ว', life: 3000 });
                    }
                },
                (error) => {
      
                    this.messageService.add({ severity: 'error', summary: 'ไม่สำเร็จ', detail: 'มีข้อผิดพลาดในการส่งคำขอ', life: 3000 });
                }
            );
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'ยกเลิก', detail: 'ยกเลิกการกระทำ', life: 3000 });
        }
    });
}


editCHanwang(material_type_id:number){
      const ref = this.dialogService.open(DialohEditTypeComponent, {
        header: 'แก้ไขประเภท',
        width: 'auto',
        data: {
          material_type_id: material_type_id
        }
      });
    
      ref.onClose.subscribe((result) => {
        console.log('Dialog closed:', result);
        // ทำสิ่งที่ต้องการเมื่อ Dialog ถูกปิด
      });
}

confirm1(event: Event,material_type_id:number) {
  this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'ต้องการลบประเภทวัสดุหรือไม่?',
      header: 'ทบทวนการกระทำ',
      acceptLabel:'ยืนยัน',
      rejectLabel:'ยกเลิก',
      rejectButtonStyleClass:"p-button-text",
      accept: () => {
        const url = 'http://localhost/backend/del_type.php';
        const data = { material_type_id };
        this.http.post<any>(url, data).subscribe(res => {
          if (res && res.status === 'success') {
            this.messageService.add({ severity: 'success', summary: 'สำเร็จ', detail: 'ลบหน่วยนับสำเร็จ', life: 3000 });
            this.load_chanwang();
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'หน่วยนับนี้มีการใช้งานอยู่', life: 3000 });
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'ยกเลิกการกระทำ', life: 3000 });
      }
  });
}
}
