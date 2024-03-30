import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Router } from '@angular/router';

interface status {
  name: string;
  code: string;
}

@Component({
  selector: 'app-dialog-edit-prd',
  templateUrl: './dialog-edit-prd.component.html',
  styleUrls: ['./dialog-edit-prd.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class DialogEditPrdComponent implements OnInit {
  material_id: any;
  prdEdit: any;
  edit_prd_name: string = '';
  edit_prd_unit: string = '';
  selectedUnit: string = '';
  selectedType: string = '';
  unitId: any;
  typeId: any;
  chanWang: any;
  staTus:status[] | undefined;
  selecStatus:string='';
  slot:any;
  selectedslot:string='';

  constructor(private http: HttpClient, public config: DynamicDialogConfig, public ref: DynamicDialogRef, private confirmationService: ConfirmationService, private messageService: MessageService, private router: Router) {

  }

  ngOnInit(): void {
    this.material_id = this.config.data.material_id;
    this.load_prd();
    this.load_unitId();
    this.load_typeId();
    this.load_slot();
    this.staTus = [
      { name: 'พร้อมใช้งาน', code: '8' },
      { name: 'ชำรุด', code: '16' },
      { name: 'หมดอายุ', code: '17' },
  ];
    
  }

  load_prd() {
    const url = 'http://localhost/backend/load_prd_by_id.php';
    const data = { material_id: this.material_id };
    this.http.post<any[]>(url, data)
      .subscribe(response => {
        this.prdEdit = response;
      });
  }
  load_unitId() {
    this.http.get<any[]>('http://localhost/backend/load_nuynab.php').subscribe(response => {
      this.unitId = response;
    });
  }
  load_typeId() {
    this.http.get<any[]>('http://localhost/backend/load_type.php').subscribe(response => {
      this.typeId = response;
    });
  }
  save_edit_prd() {
    const url = 'http://localhost/backend/edit_prd.php';
    const data = {
      edit_prd_name: this.edit_prd_name,
      selectedUnit: this.selectedUnit,
      selectedType: this.selectedType,
      material_id: this.material_id,
      selecStatus:this.selecStatus,
      selectedslot: this.selectedslot,
    };
    console.log(data);
    this.http.post<any>(url, data).subscribe((res) => {
      if (res && res.status === 'success') {
        this.messageService.add({ severity: 'success', summary: 'สำเร็จ', detail: 'แก้ไขสำเร็จ', life: 3000 });
        window.location.reload();
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'แก้ไขไม่สำเร็จ', life: 3000 });
      }
    }, (error) => {
      console.log(error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'เกิดข้อผิดพลาดในการส่งข้อมูล', life: 3000 });
    });
  }
  load_slot(){
    this.http.get<any[]>('http://localhost/backend/load_slot.php').subscribe(response =>{
      this.slot = response;
    });
  }
}

