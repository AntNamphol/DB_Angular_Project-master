import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';


@Component({
  selector: 'app-dialog-afb',
  templateUrl: './dialog-afb.component.html',
  styleUrls: ['./dialog-afb.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class DialogAfbComponent implements OnInit {
  afbId: any;
  dataFromServer: any;
  userLv:any;
  userId:any;
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private http: HttpClient,
    private confirmationService: ConfirmationService, private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.afbId = this.config.data.afbId;
    this.load_afb_item()
    this.userLv = sessionStorage.getItem('userlv_id');
    this.userId = sessionStorage.getItem('user_id');
    if (this.dataFromServer.length > 0) {
      // ตรวจสอบว่าสถานะของรายการแรกเป็นอย่างไร
      if (this.dataFromServer[0].state_id == 1) {
          // ถ้าเป็นสถานะ 1 ให้แสดงปุ่ม Approve
          this.showApproveButton = true;
      }
  }
  }

  load_afb_item() {
    const url = 'http://localhost/backend/load_afb_item.php';
    const headers = { 'Content-Type': 'application/json' };
    const data = { afbId: this.afbId };

    this.http.post<any[]>(url, data, { headers }).subscribe(
      (response) => {
        console.log('ตอบกลับจากเซิร์ฟเวอร์:', response);
        this.dataFromServer = response; // กำหนดค่าข้อมูลที่ได้รับให้กับตัวแปร dataFromServer
      },
      (error) => {
        console.error('เกิดข้อผิดพลาดในการส่งข้อมูล:', error);
      }
    );
    
  }
  showApproveButton: boolean = false;
  
  confirm1(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'คุณต้องการอนุมัติใช่หรือไม่',
      header: 'ทบทวนการกระทำ',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel:'ยืนยัน',
      rejectLabel:'ยกเลิก',
      rejectButtonStyleClass:'p-button-outlined',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'ใบขอซื้อได้รับการอนุมัติแล้ว' });
        const url = 'http://localhost/backend/accpafb.php';
        const headers = { 'Content-Type': 'application/json' };
        const data = { afbId: this.afbId,
                        userId:this.userId };

        this.http.post<any[]>(url, data, { headers }).subscribe(
          (response) => {
            console.log('ตอบกลับจากเซิร์ฟเวอร์:', response);
            this.dataFromServer = response; // กำหนดค่าข้อมูลที่ได้รับให้กับตัวแปร dataFromServer
            const timeout = 500;
            setTimeout(() => {
              window.location.reload();
            }, timeout);
          },
          (error) => {
            console.error('เกิดข้อผิดพลาดในการส่งข้อมูล:', error);
          }
        );
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'ยกเลิก', detail: 'ยกเลิกการกระทำ', life: 3000 });
      }
    });
  }

  confirm2(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'ต้องการยกเลิกใบขอซื้อหรือไม่?',
      header: 'ยกเลิก',
      icon: 'pi pi-info-circle',
      acceptLabel:'ยืนยัน',
      rejectLabel:'ยกเลิก',
      rejectButtonStyleClass:'p-button-outlined',

      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'สำเร็จ', detail: 'ยกเลิกใบขอซื้อแล้ว' });

        const url = 'http://localhost/backend/cantafb.php';
        const headers = { 'Content-Type': 'application/json' };
        const data = { afbId: this.afbId };

        this.http.post<any[]>(url, data, { headers }).subscribe(
          (response) => {
            console.log('ตอบกลับจากเซิร์ฟเวอร์:', response);
            this.dataFromServer = response; // กำหนดค่าข้อมูลที่ได้รับให้กับตัวแปร dataFromServer
            const timeout = 500;
            setTimeout(() => {
              window.location.reload();
            }, timeout);
          },
          (error) => {
            console.error('เกิดข้อผิดพลาดในการส่งข้อมูล:', error);
          }
        );


      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'ยกเลิก', detail: 'ยกเลิกการกระทำ' });
      }
    });
  }
}
