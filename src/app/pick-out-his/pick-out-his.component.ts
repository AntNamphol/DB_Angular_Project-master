import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { DataLoaderService } from '../data-loader.service';



@Component({
  selector: 'app-pick-out-his',
  templateUrl: './pick-out-his.component.html',
  styleUrls: ['./pick-out-his.component.css']
})
export class PickOutHisComponent implements OnInit {

  hisOut: any;

  constructor(private dataLoaderService: DataLoaderService) { }

  ngOnInit(): void {
    this.loadHisPicOut();
  }

  loadHisPicOut() {
    this.dataLoaderService.loadHisPicOut().subscribe(res => {
      this.hisOut = res;
    });
  }

}
