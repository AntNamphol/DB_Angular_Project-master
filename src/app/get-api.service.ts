import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GetApiService {

  constructor(private http:HttpClient) { }
  getapi(): Observable<any> { // Return type is Observable<any>
    const api = 'http://localhost/backend/';
    // const api = 'http://localhost/backend/';
    return this.http.get(api);
  }

}
