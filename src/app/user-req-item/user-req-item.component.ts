import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';

interface Item {
  name: string;
  code: string;
}
@Component({
  selector: 'app-user-req-item',
  templateUrl: './user-req-item.component.html',
  styleUrls: ['./user-req-item.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class UserReqItemComponent implements OnInit{
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
  userPic:any;
  selectedUser:string='';
  typePic:any;
  selectedtype:string='';
  itemAlleiei:any;
  searchItemId: string='';
  filteredPrdList: any[]=[]; // ประกาศตัวแปรสำหรับเก็บข้อมูลวัสดุที่ผ่านการกรอง
  searchText: string = ''; // ตัวแปรสำหรับเก็บข้อความที่ใช้ในการค้นหา
  constructor(private http: HttpClient,private confirmationService: ConfirmationService, private messageService: MessageService,private router:Router) { }
  ngOnInit() {
    this.userId = sessionStorage.getItem('user_id');
    this.load_user_pic();
    this.load_type_pic();
    this.loadload();
   
  }
  loadload(){
    this.http.get<any[]>('http://localhost/backend/load_item_pic.php')
    .subscribe(res => {
      this.itemAlleiei = res;
    });
  }
  showDialog() {
    this.visible = true;
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
  addItem(item: any) {
    this.selectedItems.push({
      code: item.material_id, // เพิ่ม material_id ที่ได้รับมาจาก item
      name: item.material_name,
      quantity: item.quantity,
      unit_name: item.unit_name,
      pic_path:item.pic_path
    });
<<<<<<< Updated upstream
    
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'เพิ่มวัสดุลงตะกร้าแล้ว' });
=======
    console.log(item);
    this.messageService.add({ severity: 'success', summary: 'สำเร็จ', detail: 'เพิ่มวัสดุลงตะกร้าแล้ว' });
>>>>>>> Stashed changes
  }


  saveData() {

    this.confirmationService.confirm({
      header: 'คุณแน่ใจที่จะบันทึกใช่ไหม?',
      message: 'โปรดตรวจสอบให้แน่ใจ',
      acceptLabel:'ยืนยัน',
      rejectLabel:'ยกเลิก',
      rejectButtonStyleClass:'p-button-outlined',
      accept: () => {
        const dataArray = [];
    for (const item of this.selectedItems) {
      const { code, name, quantity } = item;
      const data = {
        code,
        name: name.replace(/"/g, '\\"'), // Escape double quotes
        quantity,
        maysed:this.maysed,
        userId:this.userId,
        selectedUser:this.selectedUser,
        selectedtype:item.selectedtype
      };
      dataArray.push(data);
    }

    console.log('บันทึกข้อมูล', dataArray); // เช็คข้อมูลที่จะส่งไปยังเซิร์ฟเวอร์
    const url = 'http://localhost/backend/add_pic_out.php';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // ส่ง dataArray ที่เก็บข้อมูลที่แยกออกมาแล้วไปยังเซิร์ฟเวอร์
    this.http.post(url, dataArray, { headers }).subscribe(
      (response) => {
        console.log('ตอบกลับจากเซิร์ฟเวอร์:', response);
        // ทำการประมวลผลตอบกลับจากเซิร์ฟเวอร์ตามความเหมาะสม
        this.messageService.add({ severity: 'success', summary: 'สำเร็จ', detail: 'บันทึกใบเบิกวัสดุเสร็จสิ้น' });
        const timeout = 2000;
        setTimeout(() => {
          this.router.navigate(['poh']);
        }, timeout);
      },
      (error) => {
        console.error('เกิดข้อผิดพลาดในการส่งข้อมูล:', error);
        // ทำการจัดการข้อผิดพลาดในการส่งข้อมูลตามความเหมาะสม
      }
    );
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'ยกเลิก', detail: 'ยกเลิกการกระทำ', life: 3000 });
      }
  });

  }

  load_user_pic(){
    this.http.get<any>('http://localhost/backend/load_user_pic.php').subscribe(res =>{
      this.userPic = res;
    });
  }
  load_type_pic(){
    this.http.get<any>('http://localhost/backend/load_type_pic.php').subscribe(res =>{
      this.typePic = res;
    });
  }
  search() {
    // กรองข้อมูลวัสดุโดยใช้ข้อความที่ค้นหาในชื่อวัสดุ, หน่วยนับ, และชั้นวาง
    this.filteredPrdList = this.itemAlleiei.filter((prd: { material_name: string; unit_name: string; material_class_shelf_name: string; }) =>
      prd.material_name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      prd.unit_name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      prd.material_class_shelf_name.toLowerCase().includes(this.searchText.toLowerCase())
    );

  }

}


  

