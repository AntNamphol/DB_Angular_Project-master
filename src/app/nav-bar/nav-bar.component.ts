import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api'
import { MenuItem } from 'primeng/api';
import { ExcelService } from '../excel.service';
import { ExcelPicoutService } from '../excel-picout.service';
import { ExcelPoService } from '../excel-po.service';



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers: [ConfirmationService]
})
export class NavBarComponent implements OnInit {
[x: string]: any;
  username: string | null = null;
  userFname: string | null = null;
  userLname: string | null = null;
  userId: string | null = null;
  sidebarVisible: boolean = false;
  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  userlv_id: any;

  constructor(private router: Router, private confirmationService: ConfirmationService,private excelService: ExcelService,private excelPicoutService:ExcelPicoutService,private ExcelPoService:ExcelPoService) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
    this.userFname = sessionStorage.getItem('user_fname');
    this.userLname = sessionStorage.getItem('user_lname');
    this.userId = sessionStorage.getItem('user_id');
    this.userlv_id = sessionStorage.getItem('userlv_id');
    this.items = [

      {
        label: 'Dashboard',
        icon: 'pi pi-chart-bar',
        command: () => this.navDashboard(),
      },
      {
        label: 'การร้องขอทั้งหมด',
        icon: 'pi pi-verified',
        visible: this.userlv_id == 1,
        items: [
          {
            label: 'อนุมัติใบขอซื้อ',
            icon: 'pi pi-verified',
            command: () => this.navstateafb(),
          }
        ]
      },
      {
        label: 'จัดการผู้ใช้งาน',
        icon: 'pi pi-user',
        visible: this.userlv_id == 5,
        items: [
          {
            label: 'การเพิ่ม ลบ แก้ไข ผู้ใช้งาน',
            icon: 'pi pi-user-edit',
            command: () => this.navEDituser(),
          }
        ]
      },
      {
        label: 'การจัดการผู้จัดหา',
        icon: 'pi pi-briefcase',
        visible: this.userlv_id == 4,
        items:[
          {
            label: 'เพิ่ม ลบ แก้ไข ผู้จัดหา',
            icon: 'pi pi-briefcase',
            command: () => this.navCompany(),
           
          }
        ]
      
      },
      {
        label: 'การจัดหา',
        icon: 'pi pi-fw pi-box',
        items: [
          {
            label: 'การขอซื้อวัสดุ',
            icon: 'pi pi-fw pi-cart-plus',
            items: [
              {
                label: 'เพิ่มใบขอซื้อวัสดุ',
                icon: 'pi pi-fw pi-plus',

                command: () => this.navAddafb(),

              },
              {
                label: 'สถานะใบขอซื้อ',
                icon: 'pi pi-fw pi-check',
                command: () => this.navstateafb(),
              },
              {
                label: 'ประวัติใบขอซื้อของท่าน',
                icon: 'pi pi-check-circle',
                command: () => this.navHistoryafb(),

              }
            ]
          },
         
          {
            label: 'การสั่งซื้อวัสดุ',
            icon: 'pi pi-fw pi-cart-plus',
            visible: this.userlv_id == 4,
            items: [
              {
                label: 'เพิ่มใบสั่งซื้อวัสดุ',
                icon: 'pi pi-fw pi-plus',
                command: () => this.navAddpo(),
              },
              {
                label: 'สถานะใบสั่งซื้อ',
                icon: 'pi pi-fw pi-check',
                command: () => this.navPostate(),
              },
              
            ]
          }
        ]
      },
      {
        label: 'คลังวัสดุ',
        icon: 'pi pi-fw pi-inbox',
        visible: this.userlv_id != 3,
        command: () => this.navAllitem(),
      },
      {
        label: 'การจัดการคลังวัสดุ',
        icon: 'pi pi-fw pi-inbox',
        visible: this.userlv_id == 3,
        items: [
          {
            label: 'รับเข้าวัสดุ',
            icon: 'pi pi-fw pi-sign-in',
            
            items:[
              {
                label:'รายการสั่งซื้อที่รอรับเข้าทั้งหมด',
                icon:'pi pi-box',
                command:() => this.navPickin(),
              },
              {
                label:'รายการสั่งซื้อที่รับเข้าครบแล้ว',
                icon:'pi pi-check',
                command:() => this.navpicsucc(),
              },
              {
                label:'รายการประวัติรับเข้าวัสดุ',
                icon:'pi pi-history',
                command:() => this.navpichis(),
              }
            ]
          },
          {
            label: 'เบิกออกวัสดุ',
            icon: 'pi pi-fw pi-sign-out',
            items:[{
              label:'เพิ่มใบเบิกสินค้า',
              icon:'pi pi-plus',
              command : () => this.navUq(),
            },
            {
              label:'ประวัติการเบิกออกวัสดุ',
              icon:'pi pi-history',
              command : () => this.navPoh(),
            },
            {
              label:'รับคืนวัสดุ',
              icon:'pi pi-sync',
              command : () => this.navPor(),
            }
          ],
           
            visible: this.userlv_id == 3,

          },
          {
            label: 'จัดการคลังวัสดุ',
            icon: 'pi pi-fw pi-cart-plus',
            items: [
              {
                label: 'จัดการแถววางของ',
                icon: 'pi pi-bars',
                command: () => this.navRow(),
              }, 
              {
                label: 'จัดการชั้นวางของ',
                icon: 'pi pi-bars',
                command: () => this.navChanwang(),
              }, 
              {
                label: 'จัดการช่องวางของ',
                icon: 'pi pi-bars',
                command: () => this.navSlot(),
              }, 

              {
                label: 'จัดการหน่วยนับ',
                icon:'pi pi-question',
                command: () => this.navNuynab(),
              },
              {
                label:'จัดการประเภทวัสดุ',
                icon: 'pi pi-bolt',
                command:() => this.navtypeItem(),
              },
              {
                label:'เพิ่ม/ลบ/แก้ไข รายการวัสดุ',
                icon: 'pi pi-box',
                command: () => this.navAllitem(),
              }

            ]
          }
        ]
      },
      {
        label: 'REPORT',
        icon: 'pi pi-fw pi-print',
        visible: this.userlv_id == 4 || this.userlv_id == 3 ,
        items: [
          {
            label: 'รายงานงบที่ใช้ทั้งหมด',
            icon: 'pi pi-fw pi-print',
            command: () => this.navSumma(),
            visible: this.userlv_id == 4,
          },
          {
            label: 'รายการวัสดุที่ทำการขอซื้อและสั่งซื้อบ่อย',
            icon: 'pi pi-fw pi-print',
            visible: this.userlv_id == 4,
            command: () => this.reportPo(),
          },
          {
            label:'ฝ่ายที่ขอซื้อบ่อยที่สุด',
            icon: 'pi pi-fw pi-print',
            visible: this.userlv_id == 4,
          }
          ,{
            label: 'รายงานวัสดุในคลัง',
            icon: 'pi pi-fw pi-print',
            visible: this.userlv_id == 3,
            command:() => this.rest(),
          }
          ,{
            label: 'รายงานเบิกออกวัสดุ',
            icon: 'pi pi-fw pi-print',
            visible: this.userlv_id == 3,
            command:() => this.picout(),
          }
          
        ]
      },
      {
        label: 'ออกจากระบบ',
        icon: 'pi pi-fw pi-power-off',
        command: () => this.logout(),
      }
        
    ];
    this.activeItem = this.items[0];
  }
  navstateafb() {
    this.router.navigate(['afbstate']);
  }
  navAddafb() {
    this.router.navigate(['afborder']);
  }
  navDashboard() {
    this.router.navigate(['dashboard']);
  }
  navPostate() {
    this.router.navigate(['postate']);
  }

  navHistoryafb() {
    this.router.navigate(['historyafb']);
  }
  navCompany() {
    this.router.navigate(['company']);
  }
  navAddpo() {
    this.router.navigate(['poitem']);
  }
  navAllitem() {
    this.router.navigate(['allitem']);
  }
  navChanwang(){
    this.router.navigate(['chanwang']);
  }
  navNuynab(){
    this.router.navigate(['nuynab']);
  }
  navtypeItem(){
    this.router.navigate(['typeItem']);
  }
  navPickin(){
    this.router.navigate(['pickIn']);
  }
  navUq(){
    this.router.navigate(['uq']);
  }
  navSumma(){
    this.router.navigate(['summa']);
  }
  navEDituser(){
    this.router.navigate(['edu']);
  }
  navpicsucc(){
    this.router.navigate(['picsucc']);
  }
  navpichis(){
    this.router.navigate(['pichis']);
  }
  navPoh(){
    this.router.navigate(['poh']);
  } 
  navPor(){
    this.router.navigate(['por']);
  }
  rest(){
    this.excelService.exportAsExcelFile();
  }
  picout(){
    this.excelPicoutService.exportToExcel();
  }
  reportPo(){
    
    this.ExcelPoService.exportAsExcelFilePo();
  }
  navSlot(){
    this.router.navigate(['slot']);
  }
  navRow(){
    this.router.navigate(['row']);
  }
  
  logout(): void {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('user_fname');
    sessionStorage.removeItem('user_lname');
    sessionStorage.removeItem('user_id');
    this.router.navigate(['login']);
    
  }
  
}
