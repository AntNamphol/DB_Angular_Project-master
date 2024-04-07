import { Component,OnInit } from '@angular/core';
import { DataLoaderReturnService } from '../data-loader-return.service';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-pick-out-return',
  templateUrl: './pick-out-return.component.html',
  styleUrls: ['./pick-out-return.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class PickOutReturnComponent implements OnInit{
  hisOut:any;
  constructor(private dataLoaderReturnService: DataLoaderReturnService,private confirmationService: ConfirmationService, private messageService: MessageService,private http:HttpClient) { }
  ngOnInit(): void {
    this.loadHisPicOut();
  }

  loadHisPicOut() {
    this.dataLoaderReturnService.loadHisPicOut().subscribe(res => {
      this.hisOut = res;
    });
  }
  save(event: Event, po:any){
    
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'ยืนยันข้อมูลหรือไม่',
      header: 'ทบทวนการกระทำ',
      acceptLabel:'ยืนยัน',
      rejectLabel:'ยกเลิก',
      rejectButtonStyleClass:'p-button-outlined',
      accept: () => {
        console.log(po);

          
          const url ='http://localhost/backend/con_return.php';
          const data = {po};
          this.http.post<any>(url,data).subscribe( res =>{
            this.messageService.add({ severity: 'info', summary: 'สำเร็จ', detail: 'รับคืนวัสดุเสร็จสิ้น' });
            window.location.reload();
          });

      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'ยกเลิก', detail: 'ยกเลิกการกระทำ', life: 3000 });
      }
  });
  }
}
