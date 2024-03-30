import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { LoadMapService } from '../load-map.service';


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
  constructor(private http:HttpClient,private dataService: LoadMapService){
  }
    ngOnInit(): void {
      this.getData();
    }
  
    getData(): void {
      this.dataService.getData().subscribe(data => {
        this.rowData = data[0];
        this.slotData = data[1];
        this.shelfData = data[2];
      });
    }
  }


