import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogEditPrdComponent } from '../dialog-edit-prd/dialog-edit-prd.component';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ConfirmationService, MessageService,DialogService]
})
export class ProductListComponent implements OnInit{
  prdList:any;
  filteredPrdList: any[]=[]; // ประกาศตัวแปรสำหรับเก็บข้อมูลวัสดุที่ผ่านการกรอง
  searchText: string = ''; // ตัวแปรสำหรับเก็บข้อความที่ใช้ในการค้นหา
  visible1:boolean = false;
  addSheft:string='';
  userLv:any;
  visible:boolean = false;
  prdNew:string ='';
  selectedType:string='';
  selectedUnit:string='';
  unitId:any;
  typeId:any;
  chanWang:any;
  selectedchanWang:string='';
  ref: DynamicDialogRef | undefined;


  constructor(private http:HttpClient,private ProductService:ProductService,private confirmationService: ConfirmationService, private messageService: MessageService,public dialogService: DialogService){}

  ngOnInit(): void {
    this.load_prd();
    this.userLv = sessionStorage.getItem('userlv_id');
    this.load_unitId();
    this.load_typeId();
    this.load_chanwang();
  }
  load_prd(){
    this.http.get<any[]>('http://localhost/backend/load_prd.php')
      .subscribe(response => {
        this.prdList = response;
      });
  }
  getProductList() {
    // เรียกใช้งาน ProductService เพื่อดึงข้อมูลวัสดุทั้งหมด
    this.ProductService.getProducts().subscribe((data: any[]) => {
      this.prdList = data; // กำหนดค่าข้อมูลวัสดุทั้งหมด
      this.filteredPrdList = data; // กำหนดค่าข้อมูลวัสดุที่ผ่านการกรองเริ่มต้นเป็นข้อมูลทั้งหมด
    });
  }
  search() {
    // กรองข้อมูลวัสดุโดยใช้ข้อความที่ค้นหาในชื่อวัสดุ, หน่วยนับ, และชั้นวาง
    this.filteredPrdList = this.prdList.filter((prd: { material_name: string; unit_name: string; material_class_shelf_name: string; }) =>
      prd.material_name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      prd.unit_name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      prd.material_class_shelf_name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
  openDialog1(){
    this.visible1 = true;
  }

  confirm1(event: Event,material_id:number) {
    console.log(material_id);
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'ต้องการลบวัสดุชิ้นนี้ออกจากคลังหรือไม่?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon:"none",
        rejectIcon:"none",
        rejectButtonStyleClass:"p-button-text",
        accept: () => {
          const url = 'http://localhost/backend/del_prd.php';
          const data = { material_id };
          this.http.post<any>(url, data).subscribe(res => {
            if (res && res.status === 'success') {
              this.messageService.add({ severity: 'success', summary: 'สำเร็จ', detail: 'ลบวัสดุสำเร็จ', life: 3000 });
              this.load_prd();
              this.getProductList();
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'วัสดุนี้มีการใช้งานอยู่', life: 3000 });
            }
          });
        },
        reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'ยกเลิกการกระทำ', life: 3000 });
        }
    });
  }
  showDialog(){
    this.visible = true;
  }
  load_unitId(){
    this.http.get<any[]>('http://localhost/backend/load_nuynab.php').subscribe(response =>{
      this.unitId = response;
    });
  }
  load_typeId(){
    this.http.get<any[]>('http://localhost/backend/load_type.php').subscribe(response =>{
      this.typeId = response;
    });
  }
  load_chanwang(){
    this.http.get<any[]>('http://localhost/backend/load_chanwang.php').subscribe(response =>{
      this.chanWang = response;
    });
  }
  saveProduct(){
    const url = 'http://localhost/backend/add_new_prd_name.php';
    const data ={ prdNew:this.prdNew,selectedType:this.selectedType,selectedUnit:this.selectedUnit,selectedchanWang:this.selectedchanWang};

    this.http.post<any>(url,data).subscribe(
    (res) => {
      if(res && res.status ==='success'){
        this.messageService.add({ severity: 'success', summary: 'สำเร็จ', detail: 'เพิ่มวัสดุใหม่สำเร็จ', life: 3000 });
        this.load_prd();
      }else{
        this.messageService.add({ severity: 'error', summary: 'ล้มเหลว', detail: 'มีวัสดุนี้อยู่แล้ว', life: 3000 });
      }
     
    },
    (error) =>{
      console.log(error);
      this.messageService.add({ severity: 'error', summary: 'ไม่สำเร็จ', detail: 'มีข้อผิดพลาดในการส่งคำขอ', life: 3000 });
    });   
  }
  
  editPrd(material_id:number){
    console.log(material_id);
    const ref = this.dialogService.open(DialogEditPrdComponent, {
      header: 'แก้ไขวัสดุ',
      width: '100vw',
      height:'100vw',
      data: {
        material_id: material_id
      }
    });
  
    ref.onClose.subscribe((result) => {
      console.log('Dialog closed:', result);
      // ทำสิ่งที่ต้องการเมื่อ Dialog ถูกปิด
    });
  }
}
