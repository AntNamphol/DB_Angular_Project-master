import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataLoaderPicinSuccService {

  constructor(private http: HttpClient) { }

  loadHisPicOut() {
    return this.http.get<any>('http://localhost/backend/load_pick_in_succ.php');
  }
}
