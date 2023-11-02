import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private readonly BASE_URL = 'https://localhost:3002/api/posts';
  constructor(private http: HttpClient, private auth: AuthService) { }

  getPosts() {
    const token = this.auth.token;
    return this.http.get(this.BASE_URL, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  add(title: string, description: string, departmentCode: string) {
    const token = this.auth.token;
  
    const headers = {
      'Authorization': `Bearer ${token}`,
    };
  
    return this.http.post(
      this.BASE_URL,
      {
        title,
        description,
        departmentCode
      },
      { headers }
    );
  }

  delete(id: string) {
    return this.http.delete(`${this.BASE_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${this.auth.token}`,
      },
    });
  }
}
