import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  constructor(private http: HttpClient) { }

  addpost_service(ptitle:string, pdescription:string, pcode:string)
  {
    this.http.post('https://localhost:3000/api/fruits',{title:ptitle, description:pdescription, code:pcode})
    .subscribe(response =>{console.log(response)})
  }
}
