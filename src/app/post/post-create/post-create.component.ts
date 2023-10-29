import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostServiceService } from '../post-service.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent{

  constructor(public postservice: PostServiceService) { }

  onaddpost(postform: NgForm) {
    if (postform.invalid)
    {
      alert('Invalid!')
      return
    }
    alert(postform.value.enteredTitle+'\n'+postform.value.enteredDescription+'\n'+postform.value.enteredCode)

    this.postservice.addpost_service(postform.value.enteredTitle, postform.value.enteredDescription, postform.value.enteredCode)
    postform.resetForm()
  }

}
