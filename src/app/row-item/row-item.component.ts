import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogEditRowComponent } from '../dialog-edit-row/dialog-edit-row.component';


@Component({
  selector: 'app-row-item',
  templateUrl: './row-item.component.html',
  styleUrls: ['./row-item.component.css'],
  providers: [ConfirmationService, MessageService,DialogService]
})
export class RowItemComponent implements OnInit{
  row:any;
  visible:boolean = false;
  rowNew:string='';
  
  constructor(private http:HttpClient,private dialogService: DialogService,private confirmationService: ConfirmationService, private messageService: MessageService){}
  ngOnInit(): void {
    this.load_row();
    
  }
  load_row(){
    this.http.get<any[]>('http://localhost/backend/load_row.php').subscribe(response =>{
      this.row = response;
    });
  }

  showDialog(){
    this.visible = true;
  }
  confirm() {
    this.confirmationService.confirm({
        header: 'ต้องการบันทึกหรือไม่?',
        acceptLabel:'ยืนยัน',
        rejectLabel:'ยกเลิก',
        rejectButtonStyleClass:'p-button-outlined',
        accept: () => {
            const url = 'http://localhost/backend/add_row.php';
            const data = {rowNew:this.rowNew};
            this.http.post<any>(url,data).subscribe(
                (res) => {
                    if (res && res.status === 'success') {
                        this.messageService.add({ severity: 'success', summary: 'สำเร็จ', detail: 'เพิ่มแถวเสร็จสิ้น', life: 3000 });
                        this.visible = false;
                        this.load_row();
                    } else {
                        this.messageService.add({ severity: 'error', summary: 'ไม่สำเร็จ', detail: 'มีแถวนี้อยู่แล้ว', life: 3000 });
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


editrow(material_row_id:number){
      const ref = this.dialogService.open(DialogEditRowComponent, {
        header: 'แก้ไขแถววางของ',
        width: 'auto',
        data: {
          material_row_id: material_row_id
        }
      });
    
      ref.onClose.subscribe((result) => {
        console.log('Dialog closed:', result);
        // ทำสิ่งที่ต้องการเมื่อ Dialog ถูกปิด
      });
}

confirm1(event: Event,material_row_id:number) {
  this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'ต้องการลบแถววางของหรือไม่?',
      header: 'ทบทวนการกระทำ',
      acceptLabel:'ยืนยัน',
      rejectLabel:'ยกเลิก',
      rejectButtonStyleClass:'p-button-outlined',
      accept: () => {
        const url = 'http://localhost/backend/del_row.php';
        const data = { material_row_id };
        this.http.post<any>(url, data).subscribe(res => {
          if (res && res.status === 'success') {
            this.messageService.add({ severity: 'success', summary: 'สำเร็จ', detail: 'ลบแถววางของสำเร็จ', life: 3000 });
            this.load_row();
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'แถวของนี้มีการใช้งานอยู่', life: 3000 });
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'ยกเลิกการกระทำ', life: 3000 });
      }
  });
}
}
