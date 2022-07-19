import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { Post } from '../../models/post.model';
import { PostService } from '../../post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  buttonText!: string;
  userId!: string;
  liked$ = new BehaviorSubject<boolean>(false);
  post$!: Observable<Post>;
  isAuthor$ = new BehaviorSubject<boolean>(false);

  constructor(private postService: PostService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();

    const postId = this.route.snapshot.params['id'];
    this.post$ = this.postService.getPostById(postId).pipe(
      tap(post => {
        if (post.userId === this.userId) {
          this.isAuthor$.next(true);
        }
        if (post.usersIdLiked.find(user => user === this.userId)) {
          this.liked$.next(true);
          this.buttonText = 'Unlike';
        } 
        else {
          this.buttonText = 'Like';
        }
      })
    )
  }
  
  onLike(id: string) {
    if (!this.liked$) {
      this.postService.likePost(id, this.userId).pipe(
        // take(1),
        tap(() => {
          this.buttonText = 'Unlike'
        })
      ).subscribe();
    }
    else {
      this.postService.likePost(id, this.userId).pipe(
        // take(1),
        tap(() => {
          this.buttonText = 'Like'
        })
      ).subscribe()
    }
  }

  onDelete(id: string) {   
      this.postService.deletePost(id).pipe(
        tap(() => this.router.navigate(['/']))
      ).subscribe()
  }

  onEdit(id: string) {
    this.router.navigate([`${id}/modify`])
  }
}