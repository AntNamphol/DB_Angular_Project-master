import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessagesModule } from 'primeng/messages';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { SpeedDialModule } from 'primeng/speeddial';
import { PaginatorModule } from 'primeng/paginator';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';
import { StyleClassModule } from 'primeng/styleclass';
import { MenuModule } from 'primeng/menu';
import { AuthGuard } from './auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AfbOrderComponent } from './afb-order/afb-order.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AfbStateComponent } from './afb-state/afb-state.component';
import { DialogAfbComponent } from './dialog-afb/dialog-afb.component';
import { TabViewModule } from 'primeng/tabview';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HistoryafbComponent } from './historyafb/historyafb.component';
import { CompanyComponent } from './company/company.component';
import { PopUpEditCompComponent } from './pop-up-edit-comp/pop-up-edit-comp.component';
import { PoItemComponent } from './po-item/po-item.component';
import { PoStateComponent } from './po-state/po-state.component';
import { DialogPoDetialComponent } from './dialog-po-detial/dialog-po-detial.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ChanwangComponent } from './chanwang/chanwang.component';
import { DialogEditChanwangComponent } from './dialog-edit-chanwang/dialog-edit-chanwang.component';
import { NuynabComponent } from './nuynab/nuynab.component';
import { DialogEditNuynabComponent } from './dialog-edit-nuynab/dialog-edit-nuynab.component';
import { TypeItemComponent } from './type-item/type-item.component';
import { DialohEditTypeComponent } from './dialoh-edit-type/dialoh-edit-type.component';
import { DialogEditPrdComponent } from './dialog-edit-prd/dialog-edit-prd.component';
import { PickInOrderComponent } from './pick-in-order/pick-in-order.component';
import { DialogPickinComponent } from './dialog-pickin/dialog-pickin.component';
import { DialogDetailPickComponent } from './dialog-detail-pick/dialog-detail-pick.component';

import { ChartModule } from 'primeng/chart';
import { UserReqItemComponent } from './user-req-item/user-req-item.component';
import { SumaryAfbComponent } from './sumary-afb/sumary-afb.component';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { RegisterComponent } from './register/register.component';
import { PickinSuccComponent } from './pickin-succ/pickin-succ.component';
import { PickInHistoryComponent } from './pick-in-history/pick-in-history.component';
import { PickOutHisComponent } from './pick-out-his/pick-out-his.component';
import { PickOutReturnComponent } from './pick-out-return/pick-out-return.component';
import { EditPermisionUserComponent } from './edit-permision-user/edit-permision-user.component';
import { SidebarModule } from 'primeng/sidebar';

import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { SlotItemComponent } from './slot-item/slot-item.component';
import { DialogEditSlotComponent } from './dialog-edit-slot/dialog-edit-slot.component';
import { RowItemComponent } from './row-item/row-item.component';
import { DialogEditRowComponent } from './dialog-edit-row/dialog-edit-row.component';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogMapItemComponent } from './dialog-map-item/dialog-map-item.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogEditUserComponent } from './dialog-edit-user/dialog-edit-user.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { AfbMenuComponent } from './afb-menu/afb-menu.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'afborder', component: AfbOrderComponent, canActivate: [AuthGuard] },
  { path: 'afbstate', component: AfbStateComponent, canActivate: [AuthGuard] },
  { path: 'historyafb', component: HistoryafbComponent, canActivate: [AuthGuard] },
  { path: 'company', component: CompanyComponent, canActivate: [AuthGuard] },
  { path: 'poitem', component: PoItemComponent, canActivate: [AuthGuard] },
  { path: 'postate', component: PoStateComponent, canActivate: [AuthGuard] },
  { path: 'allitem', component: ProductListComponent, canActivate: [AuthGuard] },
  { path: 'chanwang', component: ChanwangComponent, canActivate: [AuthGuard] },
  { path: 'nuynab', component: NuynabComponent, canActivate: [AuthGuard] },
  { path: 'typeItem', component: TypeItemComponent, canActivate: [AuthGuard] },
  { path: 'pickIn', component: PickInOrderComponent, canActivate: [AuthGuard] },
  { path: 'uq', component: UserReqItemComponent, canActivate: [AuthGuard] },
  { path: 'summa', component: SumaryAfbComponent, canActivate: [AuthGuard] },
  { path: 'picsucc', component: PickinSuccComponent, canActivate: [AuthGuard] },
  { path: 'pichis', component: PickInHistoryComponent, canActivate: [AuthGuard] },
  { path: 'poh', component: PickOutHisComponent, canActivate: [AuthGuard] },
  { path: 'por', component: PickOutReturnComponent, canActivate: [AuthGuard] },
  { path: 'edu', component: EditPermisionUserComponent, canActivate: [AuthGuard] },
  { path: 'slot', component: SlotItemComponent, canActivate: [AuthGuard] },
  { path: 'row', component: RowItemComponent, canActivate: [AuthGuard] },
  { path: 'test', component: DialogMapItemComponent, canActivate: [AuthGuard] },
  { path: 'afbmenu', component: AfbMenuComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({

  declarations: [
    
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavBarComponent,
    AfbOrderComponent,
    AfbStateComponent,
    DialogAfbComponent,
    HistoryafbComponent,
    CompanyComponent,
    PopUpEditCompComponent,
    PoItemComponent,
    PoStateComponent,
    DialogPoDetialComponent,
    ProductListComponent,
    ChanwangComponent,
    DialogEditChanwangComponent,
    NuynabComponent,
    DialogEditNuynabComponent,
    TypeItemComponent,
    DialohEditTypeComponent,
    DialogEditPrdComponent,
    PickInOrderComponent,
    DialogPickinComponent,
    DialogDetailPickComponent,
    UserReqItemComponent,
    SumaryAfbComponent,
    RegisterComponent,
    PickinSuccComponent,
    PickInHistoryComponent,
    PickOutHisComponent,
    PickOutReturnComponent,
    EditPermisionUserComponent,
    SlotItemComponent,
    DialogEditSlotComponent,
    RowItemComponent,
    DialogEditRowComponent,
    DialogMapItemComponent,
    DialogEditUserComponent,
    AfbMenuComponent,
    
    
  ],
  imports: [
    AutoCompleteModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    CalendarModule,
    ButtonModule,
    ConfirmDialogModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    ConfirmPopupModule,
    ToastModule,
    DynamicDialogModule,
    TableModule,
    SpeedDialModule,
    PaginatorModule,
    MenubarModule,
    CardModule,
    FieldsetModule,
    PanelModule,
    StyleClassModule,
    MenuModule,
    TabViewModule,
    ChartModule,
    PasswordModule,
    DividerModule,
    FileUploadModule,
    ImageModule,
    CheckboxModule,
    RadioButtonModule,
    TabMenuModule,
    MessagesModule,
    SidebarModule
  ],
  exports: [RouterModule],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

