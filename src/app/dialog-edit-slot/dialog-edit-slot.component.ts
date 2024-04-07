import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-edit-slot',
  templateUrl: './dialog-edit-slot.component.html',
  styleUrls: ['./dialog-edit-slot.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class DialogEditSlotComponent implements OnInit {
  material_slot_id: any;
  edit_slot: any;
  chanWang: any;
  material_row_id: any;
  material_class_shelf_id: any;
  slot: any;
  row: any;
  selectedRow: string = '';
  selectedchanWang: string = '';
  constructor(private http: HttpClient, public config: DynamicDialogConfig, public ref: DynamicDialogRef, private confirmationService: ConfirmationService, private messageService: MessageService, private router: Router) {

  }

  ngOnInit(): void {
    this.material_slot_id = this.config.data.material_slot_id;
    this.material_row_id = this.config.data.material_row_id;
    this.material_class_shelf_id = this.config.data.material_class_shelf_id;

    this.load();
    this.load_row();
    this.load_chanwang();
  }

  load() {
    const url = 'http://localhost/backend/loadslot.php';
    const data = { material_slot_id: this.material_slot_id };
    this.http.post<any>(url, data).subscribe(ress => {
      this.slot = ress;

    });
  }
  load_chanwang(){
    this.http.get<any[]>('http://localhost/backend/load_chanwang.php').subscribe(response =>{
      this.chanWang = response;
    });
  }
  load_row(){
    this.http.get<any[]>('http://localhost/backend/load_row.php').subscribe(response =>{
      this.row = response;
    });
  }
  save_eiei(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      header: 'ต้องการแก้ไขชั้นวางหรือไม่',
      acceptLabel:'ยืนยัน',
      rejectLabel:'ยกเลิก',
      rejectButtonStyleClass:'p-button-outlined',
      accept: () => {
        const url = 'http://localhost/backend/edit_slot.php';
        const data = {
          edit_slot: this.edit_slot,
          material_slot_id: this.material_slot_id,
          selectedRow:this.selectedRow,
          selectedchanWang:this.selectedchanWang
        };
        this.http.post<any>(url, data).subscribe(res => {
          if (res && res.status === 'success') {
            this.messageService.add({ severity: 'success', summary: 'สำเร็จ', detail: 'แก้ไขสำเร็จ', life: 3000 });
            window.location.reload();

          } else {
            this.messageService.add({ severity: 'error', summary: 'เกิดข้อผิดพลาด', detail: 'แก้ไขไม่สำเร็จ', life: 3000 });
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'ยกเลิก', detail: 'ยกเลิกการกระทำ', life: 3000 });
      }
    });
  }
}
