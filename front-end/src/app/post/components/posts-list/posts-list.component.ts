import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import AOS from 'aos';

import { Post } from '../../models/post.model';
import { PostService } from '../../post.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {

  posts$!: Observable<Post[]>;

  constructor(private postService: PostService,
              private router: Router) { }

  ngOnInit(): void {
    AOS.init();
    this.posts$ = this.postService.getAllPosts();
  }

  toPostDetails(id: string) {
    this.router.navigateByUrl(`/${id}`)
  }

}
