import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  title = new FormControl('');
  description = new FormControl('');
  departmentCode = new FormControl('');
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
      error: (e) => console.log(e),
    });    
  }

  addNewPost(e: Event) {
    // Setting the defaults
    e.preventDefault();
    this.hasError = false;

    if (
      !this.title.value ||
      !this.description.value ||
      !this.departmentCode.value
    )
    {
      this.hasError = true;
      this.errorMessage = 'Please fill in all values before continuing';
      return;
    }

    this.postsSerivce
    .add(this.title.value, this.description.value, this.departmentCode.value)
    .subscribe({
      next: (v) => {
        this.posts.push(v);
        this.title.setValue('');
        this.description.setValue('');
        this.departmentCode.setValue('');
      },
      error: (e) => {
        this.hasError = true;
        this.errorMessage = e.error;
        console.log(e);
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
