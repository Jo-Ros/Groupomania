import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './components/post/post.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PostComponent,
    PostsListComponent,
    PostDetailsComponent,
    PostFormComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    SharedModule
  ]
})
export class PostModule { }
