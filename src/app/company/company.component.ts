import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PopUpEditCompComponent } from '../pop-up-edit-comp/pop-up-edit-comp.component';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  providers: [MessageService,DialogService]
})
export class CompanyComponent implements OnInit{
  visible: boolean = false;
  name_comp:string='';
  num_comp:string='';
  email_comp:string='';
  comp_address:string='';
  companies:any[] = [];
  compS:any;
  searchComName:string='';
  constructor(private http:HttpClient,private messageService: MessageService,private dialogService: DialogService){

  }

  ngOnInit(): void {
    this.load_comp()
  }
  searchAfbIdChange(company_name: string) {
    this.compS = this.companies.filter(item => item.company_name.includes(company_name));
    console.log(this.compS);
  }
  
  showDialog() {
      this.visible = true;
  }
  save_comp() {
    // ตรวจสอบความถูกต้องของข้อมูล
    if (this.name_comp && this.num_comp && this.comp_address && this.email_comp) {
      const data = {
        name_comp: this.name_comp,
        num_comp: this.num_comp,
        email_comp: this.email_comp,
        comp_address: this.comp_address
      };
      const url = 'http://localhost/backend/add_comp.php';
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.post(url, data, { headers }).subscribe(
        (response) => {
          this.messageService.add({ severity: 'success', summary: 'สำเร็จ', detail: 'เพิ่มรายชื่อบริษัทเสร็จสิ้น' });
          this.load_comp();
          this.visible = false;
        },
        (error) => {
          console.error('เกิดข้อผิดพลาดในการส่งข้อมูล:', error);
          this.messageService.add({ severity: 'error', summary: 'เกิดข้อผิดพลาด', detail: 'เกิดข้อผิดพลาดในการส่งข้อมูล' });
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'เกิดข้อผิดพลาด', detail: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
    }
  }

  load_comp(){
    const url = 'http://localhost/backend/load_comp.php';
    this.http.get<any[]>(url).subscribe(
      (response) => {
        this.companies = response;
      },
      (error) => {
        console.error('เกิดข้อผิดพลาดในการรับข้อมูล:', error);
      }
    );
  }
  editCompany(company_id: number) {
    const ref = this.dialogService.open(PopUpEditCompComponent, {
      header: 'แก้ไขรายชื่อบริษัท',
      width: '60%',
      data: {
        company_id: company_id
      }
    });
  
    ref.onClose.subscribe((result) => {
      console.log('Dialog closed:', result);
      // ทำสิ่งที่ต้องการเมื่อ Dialog ถูกปิด
    });
    console.log(company_id);
  }

  deleteCompany(company_id: number) {
    console.log(company_id);
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบบริษัทนี้?')) {
      const url = `http://localhost/backend/delete_company.php`;
      const data = { company_id };
      this.http.post<any>(url,data ).subscribe(
        () => {
          this.load_comp();
        },
        (error) => {
          console.error('เกิดข้อผิดพลาดในการลบบริษัท:', error);
        }
      );
    }
  }
}
