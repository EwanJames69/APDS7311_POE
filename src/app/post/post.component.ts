import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input('id') id = '';
  @Input('title') title = '';
  @Input('description') description = '';
  @Input('departmentCode') departmentCode = '';
  @Output() delete = new EventEmitter()

  constructor() { }

  ngOnInit(): void { }

  onClick() {
    this.delete.emit();
  }
}
