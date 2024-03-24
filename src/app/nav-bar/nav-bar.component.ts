import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api'
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers: [ConfirmationService]
})
export class NavBarComponent implements OnInit {
  username: string | null = null;
  userFname: string | null = null;
  userLname: string | null = null;
  userId: string | null = null;
  sidebarVisible: boolean = false;
  items: MenuItem[] | undefined;
  userlv_id: any;

  constructor(private router: Router, private confirmationService: ConfirmationService) { }

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
            label: 'แก้ไขสิทธิ์ผู้ใช้',
            icon: 'pi pi-user-edit',
            command: () => this.navEDituser(),
          }
        ]
      },
      {
        label: 'การจัดหา',
        icon: 'pi pi-fw pi-box',
        visible: this.userlv_id == 2 || this.userlv_id == 3 || this.userlv_id == 4 || this.userlv_id == 5,
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
                label: 'สภานะใบขอซื้อ',
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
                label: 'รายชื่อบริษัททั้งหมด',
                icon: 'pi pi-briefcase',
                command: () => this.navCompany(),
              },
              {
                label: 'เพิ่มใบสั่งซื้อวัสดุ',
                icon: 'pi pi-fw pi-plus',
                command: () => this.navAddpo(),
              },
              {
                label: 'สภานะใบสั่งซื้อ',
                icon: 'pi pi-fw pi-check',
                command: () => this.navPostate(),
              },
              {
                label: 'ประวัติใบสั่งซื้อ',
                icon: 'pi pi-check-circle',


              }
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
            command:() => this.navPickin(),
          },
          {
            label: 'จัดการคลังวัสดุ',
            icon: 'pi pi-fw pi-cart-plus',
            items: [
              {
                label: 'จัดการชั้นวางของ',
                icon: 'pi pi-bars',
                command: () => this.navChanwang(),
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
        label: 'เบิกออกวัสดุ',
        icon: 'pi pi-fw pi-shopping-cart',
        visible: this.userlv_id == 3,
        items: [
          {
            label: 'ข้อมูลพนักงานเบิกวัสดุ',
            icon: 'pi pi-fw pi-info-circle',
            items: [
              {
                label: 'เพิ่ม/ลบ/แก้ไข ข้อมูลพนักงานเบิกวัสดุ',
                icon: 'pi pi-fw pi-user-edit',
                command : () => this.navUq(),


              }
            ]
          },
          {
            label: 'เบิกออกวัสดุ',
            icon: 'pi pi-fw pi-cart-plus',

          }
        ]
      },
      {
        label: 'REPORT',
        icon: 'pi pi-fw pi-print',
        items: [
          {
            label: 'รายงานงบที่ใช้ทั้งหมด',
            icon: 'pi pi-fw pi-print',
            command: () => this.navSumma(),
          },
          {
            label: 'รายการวัสดุที่ทำการขอซื้อและสั่งซื้อบ่อย',
            icon: 'pi pi-fw pi-print'
          },
          {
            label:'ฝ่ายที่ขอซื้อบ่อยที่สุด',
            icon: 'pi pi-fw pi-print'
          }
        ]
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-power-off',
        command: () => this.logout(),
      },{
        label: `ชื่อผู้ใช้ : ${this.userFname} ${this.userLname} `,
      }
        
    ];
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
    
  }
  logout(): void {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('user_fname');
    sessionStorage.removeItem('user_lname');
    sessionStorage.removeItem('user_id');
    this.router.navigate(['login']);
  }
}
