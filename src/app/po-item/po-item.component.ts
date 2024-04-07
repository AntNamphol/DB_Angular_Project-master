import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Router } from '@angular/router';


interface Company {
  company_id: any;
  // เพิ่ม properties อื่นๆ ที่ต้องการใช้งาน
}

@Component({
  selector: 'app-po-item',
  templateUrl: './po-item.component.html',
  styleUrls: ['./po-item.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class PoItemComponent implements OnInit {
  visible: boolean = false;
  afborder: any;
  item_select: any;
  price: string = '';
  totalPrice: number = 0;
  items: any[] = [];
  whocon: any[] = [];
  afbId: string = '';
  userId: string = '';
  afbComment: string = '';
  afbDate: string = '';
  stateId: string = '';
  userFullname: string = '';
  userDepartName: string = '';

  // ในคอมโพเนนต์ Angular ของคุณ
  companies: any[] = [];
  selectedCompany: Company | undefined;

  constructor(private http: HttpClient, private confirmationService: ConfirmationService, private messageService: MessageService,private router:Router) { }

  ngOnInit(): void {
    this.load_afb();
    this.load_comp();
  }
  exportToExcel(event: Event): void {

    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'ต้องการบันทึกใบสั่งซื้อหรือไม่?',
      header: 'ทบทวนการกระทำ',
      acceptLabel:'ยืนยัน',
      rejectLabel:'ยกเลิก',
      rejectButtonStyleClass:'p-button-outlined',
      accept: () => {
        const data = {
          whocon: this.whocon,
          afbId: this.afbId,
          userFullname: this.userFullname,
          userDepartName: this.userDepartName,
          userId: this.userId,
          afbDate: this.afbDate,
          selectedCompany: this.selectedCompany,
          items: this.items
        };

        // Send the data to PHP server
        this.http.post<any>('http://localhost/backend/save_po.php', data)
          .subscribe(response => {
            console.log('Response from PHP server:', response);
            // Handle response as needed
            if (response.status == 'success') {
              console.log('สั่งซื้อเสร็จสิ้น');
              this.messageService.add({ severity: 'success', summary: 'บันทึก', detail: 'บันทึกเสร็จสิ้น' });
              this.router.navigate(['postate']);
            } else {
              console.log('เกิดข้อผิดพลาด');
              this.messageService.add({ severity: 'error', summary: 'เกิดข้อผิดพลาด', detail: 'กรุณาตรวจสอบข้อมูลให้ครบถ้วน' });
            }
          }, error => {
            console.error('Error:', error);
            // Handle error as needed
          });

       
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'ยกเลิก', detail: 'ยกเลิกการกระทำ', life: 3000 });
      }
    });
  }
  
  showDialog() {
    this.visible = true;
  }
  load_afb() {
    this.http.get<any[]>('http://localhost/backend/load_afb_for_select_po.php')
      .subscribe(response => {
        this.afborder = response.map(item => ({ afbId: item.afb_from_id, userId: item.user_id, afb_comment: item.afb_comment, afb_date: item.afb_date, state_id: item.state_id, userFullname: item.user_fullname, userdepart_name: item.userdepart_name }));
      });
  }
  load_comp() {
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
  selectPurchaseOrder(afbItem: any) {
    const url = 'http://localhost/backend/load_afb_item_for_select_po.php'; // URL ของ PHP script ที่รับข้อมูล
    const data = { afbItem }; // ข้อมูลที่จะส่งไปยัง PHP backend
    this.http.post<any>(url, data).pipe(
      map(response => {
        this.items = response.items;
        this.afbId = response.afbId;
        this.userId = response.userId;
        this.afbComment = response.afb_comment;
        this.afbDate = response.afb_date;
        this.stateId = response.state_id;
        this.userFullname = response.userFullname;
        this.userDepartName = response.userdepart_name;
        this.whocon = response.whocon;
        this.visible = false;
      })
    ).subscribe();


  }

  calculateTotalPrice() {
    this.totalPrice = this.items.reduce((total: number, item: { price: any; afb_item_values: any; }) => total + parseFloat(item.price || 0) * parseFloat(item.afb_item_values || 0), 0);
  }


}
