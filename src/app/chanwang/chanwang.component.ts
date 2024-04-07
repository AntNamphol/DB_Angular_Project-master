import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogEditChanwangComponent } from '../dialog-edit-chanwang/dialog-edit-chanwang.component';



@Component({
  selector: 'app-chanwang',
  templateUrl: './chanwang.component.html',
  styleUrls: ['./chanwang.component.css'],
  providers: [ConfirmationService, MessageService,DialogService]
})
export class ChanwangComponent implements OnInit{
  chanWang:any;
  visible:boolean = false;
  chanWangNew:string='';
  constructor(private http:HttpClient,private dialogService: DialogService,private confirmationService: ConfirmationService, private messageService: MessageService){}
  ngOnInit(): void {
    this.load_chanwang();
    
  }
  load_chanwang(){
    this.http.get<any[]>('http://localhost/backend/load_chanwang.php').subscribe(response =>{
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
            const url = 'http://localhost/backend/add_chanwang.php';
            const data = {chanWangNew:this.chanWangNew};
            this.http.post<any>(url,data).subscribe(
                (res) => {
                    console.log(res);
                    if (res && res.status === 'success') {
                        this.messageService.add({ severity: 'success', summary: 'สำเร็จ', detail: 'เพิ่มชั้นเสร็จสิ้น', life: 3000 });
                        this.visible = false;
                        this.load_chanwang();
                    } else {
                        this.messageService.add({ severity: 'error', summary: 'ไม่สำเร็จ', detail: 'มีชั้นนี้อยู่แล้ว', life: 3000 });
                    }
                },
                (error) => {
                    console.log(error);
                    this.messageService.add({ severity: 'error', summary: 'ไม่สำเร็จ', detail: 'มีข้อผิดพลาดในการส่งคำขอ', life: 3000 });
                }
            );
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'ยกเลิก', detail: 'ยกเลิกการเพิ่มชั้นวางวัสดุ', life: 3000 });
        }
    });
}


editCHanwang(material_class_shelf_id:number){
      const ref = this.dialogService.open(DialogEditChanwangComponent, {
        header: 'แก้ไขชั้นวาง',
        width: 'auto',
        data: {
          material_class_shelf_id: material_class_shelf_id
        }
      });
    
      ref.onClose.subscribe((result) => {
        console.log('Dialog closed:', result);
        // ทำสิ่งที่ต้องการเมื่อ Dialog ถูกปิด
      });
}

confirm1(event: Event,material_class_shelf_id:number) {
  console.log(material_class_shelf_id);
  this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'ต้องการลบชั้นวางหรือไม่?',
      header: 'ทบทวนการกระทำ',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      acceptLabel:'ยืนยัน',
      rejectLabel:'ยกเลิก',
      rejectButtonStyleClass:'p-button-outlined',
      accept: () => {
        const url = 'http://localhost/backend/del_chanwang.php';
        const data = { material_class_shelf_id };
        this.http.post<any>(url, data).subscribe(res => {
          if (res && res.status === 'success') {
            this.messageService.add({ severity: 'success', summary: 'สำเร็จ', detail: 'ลบชั้นวางสำเร็จ', life: 3000 });
            this.load_chanwang();
          } else {
            this.messageService.add({ severity: 'error', summary: 'เกิดข้อผิดพลาด', detail: 'ชั้นวางนี้มีการใช้งานอยู่', life: 3000 });
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'ยกเลิก', detail: 'ยกเลิกการกระทำ', life: 3000 });
      }
  });
}
}

