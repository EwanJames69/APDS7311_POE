import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: any[] = []; // Initialize posts as an array
  hasError = false;
  errorMessage = '';

  constructor(
    private router: Router, 
    private auth: AuthService,
    private postsService: PostsService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    const baseUrl = 'https://localhost:3002/api/posts';

    this.http.get(baseUrl).subscribe(
      (response: any) => {
        if (Array.isArray(response.posts)) {
          this.posts = response.posts;
        } else {
          console.error('Invalid response structure: posts array not found.');
        }
      },
      (error) => {
        console.error('Error fetching posts:', error);
        this.hasError = true;
        this.errorMessage = 'An error occurred while fetching posts.';
      }
    );
  }
  
  deletePost(id: string) {
    // Checking if the user is logged in
    if (!this.auth.isLoggedIn) {
      // Displaying an error message
      this.hasError = true;
      this.errorMessage = 'You are not authorized to delete a post.';
      return;
  }

  this.postsService.delete(id)
      .subscribe({
          next: (v) => {
              console.log(v);
              // Remove the deleted post from the list
              const filtered = this.posts.filter((post) => post._id !== id);
              this.posts = filtered;
          },
          error: (e) => {
              console.log(e);
              // Handle error, show error message if necessary
          }
      }
    );
  }
}