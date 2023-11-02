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
    private postsSerivce: PostsService
  ) { }

  ngOnInit(): void {
    if (!this.auth.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }
    this.postsSerivce.getPosts().subscribe({
      next: (v) => (this.posts = v as any),
      error: (e) => {
        this.hasError = true;
        this.errorMessage = 'An error occurred while fetching posts.';
      },
    });    
  }  

  deletePost(id: string) {
    console.log('I was summoned');
    this.postsSerivce
      .delete(id)
      .subscribe({ next: (v) => console.log(v), error: (e) => console.log(e)})

      const filtered = this.posts.filter((post) => post._id !== id);
      this.posts = filtered;
  }
}
