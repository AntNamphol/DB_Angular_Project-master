import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogEditNuynabComponent } from '../dialog-edit-nuynab/dialog-edit-nuynab.component';




@Component({
  selector: 'app-nuynab',
  templateUrl: './nuynab.component.html',
  styleUrls: ['./nuynab.component.css'],
  providers: [ConfirmationService, MessageService,DialogService]
})
export class NuynabComponent implements OnInit{
  chanWang:any;
  visible:boolean = false;
  nuynabNaw:string='';
  constructor(private http:HttpClient,private dialogService: DialogService,private confirmationService: ConfirmationService, private messageService: MessageService){}
  ngOnInit(): void {
    this.load_chanwang();
    
  }
  load_chanwang(){
    this.http.get<any[]>('http://localhost/backend/load_nuynab.php').subscribe(response =>{
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
            const url = 'http://localhost/backend/add_nuynab.php';
            const data = {nuynabNaw:this.nuynabNaw};
            this.http.post<any>(url,data).subscribe(
                (res) => {
                    console.log(res);
                    if (res && res.status === 'success') {
                        this.messageService.add({ severity: 'success', summary: 'สำเร็จ', detail: 'เพิ่มหน่วยนับเสร็จสิ้น', life: 3000 });
                        this.visible = false;
                        this.load_chanwang();
                    } else {
                        this.messageService.add({ severity: 'error', summary: 'ไม่สำเร็จ', detail: 'มีหน่วยนับนี้อยู่แล้ว', life: 3000 });
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


editCHanwang(unit_id:number){
      const ref = this.dialogService.open(DialogEditNuynabComponent, {
        header: 'แก้ไขหน่วยนับ',
        width: 'auto',
        data: {
          unit_id: unit_id
        }
      });
    
      ref.onClose.subscribe((result) => {
        console.log('Dialog closed:', result);
        // ทำสิ่งที่ต้องการเมื่อ Dialog ถูกปิด
      });
}

confirm1(event: Event,unit_id:number) {
  console.log(unit_id);
  this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'ต้องการลบหน่วยนับหรือไม่?',
      header: 'ทบทวนการกระทำ',
      acceptLabel:'ยืนยัน',
      rejectLabel:'ยกเลิก',
      rejectButtonStyleClass:'p-button-outlined',
      accept: () => {
        const url = 'http://localhost/backend/del_nuynab.php';
        const data = { unit_id };
        this.http.post<any>(url, data).subscribe(res => {
          if (res && res.status === 'success') {
            this.messageService.add({ severity: 'success', summary: 'สำเร็จ', detail: 'ลบหน่วยนับสำเร็จ', life: 3000 });
            this.load_chanwang();
          } else {
            this.messageService.add({ severity: 'error', summary: 'เกิดข้อผิดพลาด', detail: 'หน่วยนับนี้มีการใช้งานอยู่', life: 3000 });
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'ยกเลิก', detail: 'ยกเลิกการกระทำ', life: 3000 });
      }
  });
}
}
