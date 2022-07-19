import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './components/post/post.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PostService } from './post.service';
import { MofifyPostFormComponent } from './components/mofify-post-form/mofify-post-form.component';


@NgModule({
  declarations: [
    PostComponent,
    PostsListComponent,
    PostDetailsComponent,
    PostFormComponent,
    MofifyPostFormComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [
    PostService
  ]
})
export class PostModule { }
