import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  private postsdisplay:{_id:string,title:string,description:string,code:string,__v:string}[] = [];
  private updatedpostsdisplay = new Subject<{_id:string,title:string,description:string,code:string,__v:string}[]>();

  constructor(private http: HttpClient) { }

  addpost_service(ptitle:string, pdescription:string, pcode:string)
  {
    this.http.post<{message:string,post:any}>('https://localhost:3000/api/posts',{title:ptitle, description:pdescription, code:pcode})
    .subscribe((thepost)=>
    {
      this.postsdisplay.push(thepost.post);
      this.updatedpostsdisplay.next([...this.postsdisplay]);
    })
  }

  getpost_service() {
    this.http.get<{message:string,post:any}>('https://localhost:3000/api/posts')
    .subscribe((thepost)=>
    {
      this.postsdisplay = thepost.post
      this.updatedpostsdisplay.next([...this.postsdisplay]);
    })
  }

  deletepost_service(posttitle: string)
  {
    this.http.delete('https://localhost:3000/api/posts/' + posttitle)
    .subscribe(()=>
    {
      const updatedpostsdeleted = this.postsdisplay.filter(post=>post._id!==posttitle);
      this.postsdisplay = updatedpostsdeleted;
      this.updatedpostsdisplay.next([...this.postsdisplay]);
    })
  }

  getUpdateListener()
  {
    return this.updatedpostsdisplay.asObservable();
  }
}
