import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';


interface Item {
  name: string;
  code: string;
}

@Component({
  selector: 'app-afb-order',
  templateUrl: './afb-order.component.html',
  styleUrls: ['./afb-order.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class AfbOrderComponent implements OnInit {
[x: string]: any;
  visible: boolean = false;
  visible2: boolean = false;
  value: string = '';
  stock: any;
  selectedItem: Item | undefined;
  selectedItems: any[] = [];
  userId: any;
  maysed: string = '';
  unitId:any;
  selectedUnit:any;
  constructor(private http: HttpClient,private confirmationService: ConfirmationService, private messageService: MessageService,private router:Router) { }
  ngOnInit() {
    this.userId = sessionStorage.getItem('user_id');
  }

  addItem(item: any) {
    this.selectedItems.push({
      code: item.code, // เพิ่ม material_id ที่ได้รับมาจาก item
      name: item.name,
      quantity: item.quantity,
      unit_name: item.unit_name
    });
    
    console.log(item.unit_name);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'เพิ่มสินค้าลงตะกร้าแล้ว' });
  }

  editItem(item: any) {
    // เก็บค่าจำนวนเดิมก่อนแก้ไข
    item.prevQuantity = item.quantity;
  }
  toggleEdit(item: any) {
    item.editing = !item.editing;
  }

  deleteItem(item: any) {
    // ลบรายการออกจาก selectedItems
    this.selectedItems = this.selectedItems.filter(selectedItem => selectedItem !== item);
  }
  showDialog2(){
    this.visible2 = true;
    this.visible = false;
  }

  saveData() {

    this.confirmationService.confirm({
      header: 'คุณแน่ใจที่จะบันทึกใช่ไหม?',
      message: 'โปรดตรวจสอบให้แน่ใจ',
      accept: () => {
        const dataArray = [];
    for (const item of this.selectedItems) {
      const { code, name, quantity,selectedUnit } = item;

      const data = {
        code,
        name: name.replace(/"/g, '\\"'), // Escape double quotes
        quantity,
        maysed:this.maysed,
        userId:this.userId
      };
      dataArray.push(data);
    }

    console.log('บันทึกข้อมูล', dataArray); // เช็คข้อมูลที่จะส่งไปยังเซิร์ฟเวอร์
    const url = 'http://localhost/backend/add_afb.php';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // ส่ง dataArray ที่เก็บข้อมูลที่แยกออกมาแล้วไปยังเซิร์ฟเวอร์
    this.http.post(url, dataArray, { headers }).subscribe(
      (response) => {
        console.log('ตอบกลับจากเซิร์ฟเวอร์:', response);
        // ทำการประมวลผลตอบกลับจากเซิร์ฟเวอร์ตามความเหมาะสม
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'บันทึกใบขอซื้อเรียบร้อยแล้ว' });
        const timeout = 2000;
        setTimeout(() => {
          this.router.navigate(['afbstate']);
        }, timeout);
      },
      (error) => {
        console.error('เกิดข้อผิดพลาดในการส่งข้อมูล:', error);
        // ทำการจัดการข้อผิดพลาดในการส่งข้อมูลตามความเหมาะสม
      }
    );
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
  });

  }




  showDialog() {
    this.visible = true;
  }

  search(event: any) {
    const query = event.query; // รับคำค้นหาจากผู้ใช้
    this.http.get<any[]>('http://localhost/backend/load_item.php?query=' + query)
      .subscribe(response => {
        // กรองข้อมูลโดยใช้คำค้นหา
        const filteredItems = response.filter(item => item.material_name.toLowerCase().includes(query.toLowerCase()));
        // แปลงข้อมูลที่กรองแล้วเป็นรูปแบบที่ AutoComplete ใช้
        this.stock = filteredItems.map(item => ({ name: item.material_name, code: item.material_id,unitId:item.unit_id,unit_name:item.unit_name }));
      });
  }

}
