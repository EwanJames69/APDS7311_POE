import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: any[] = [];
  hasError = false;
  errorMessage = '';

  constructor(
    private router: Router, 
    private auth: AuthService,
    private postsService: PostsService
  ) { }

  ngOnInit(): void {
    this.postsService.getPosts().subscribe({
      next: (v) => {
        if (Array.isArray(v)) {
          this.posts = v as any;
        } else {
          // Handling the case where v is not an array
          this.posts = [];
        }
      },
      error: (e) => {
        this.hasError = true;
        this.errorMessage = 'An error occurred while fetching posts.';
      },
    });
  }

  deletePost(id: string) {
    console.log('I was summoned');
    this.postsService
      .delete(id)
      .subscribe({ next: (v) => console.log(v), error: (e) => console.log(e)})

      const filtered = this.posts.filter((post) => post._id !== id);
      this.posts = filtered;
  }
}