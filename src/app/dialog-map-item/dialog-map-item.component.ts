import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';



@Component({
  selector: 'app-dialog-map-item',
  templateUrl: './dialog-map-item.component.html',
  styleUrls: ['./dialog-map-item.component.css']
})
export class DialogMapItemComponent implements OnInit{
  rowData: any[]=[];
  slotData: any[]=[];
  shelfData: any[]=[];
  materialData: any[] = [];
  material_id:any;
  constructor(private http:HttpClient, public config: DynamicDialogConfig, public ref: DynamicDialogRef){
  }
    ngOnInit(): void {
      this.material_id = this.config.data.material_id;
      this.load_data();
    }
    
    load_data(){
      const url = 'http://localhost/backend/loadDataRow.php';
      const data = {material_id:this.material_id};
      this.http.post<any>(url,data).subscribe(res=>{
        this.rowData = res;
      })
    }

  }


