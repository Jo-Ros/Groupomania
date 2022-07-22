import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, debounce, debounceTime, interval, Observable, Subject, take, tap } from 'rxjs';

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
  numberOfLikes!: number;
  likeClicked$ = new Subject<string>();

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
        this.numberOfLikes = post.usersIdLiked.length;

        if (post.userId === this.userId) {
          this.isAuthor$.next(true);
        }
        if (post.usersIdLiked.find(user => user === this.userId)) {
          this.buttonText = 'Unlike';
        } 
        else {
          this.buttonText = 'Like';
        }
      })
    );

    const likeClickedDebounced = this.likeClicked$.pipe( debounceTime(500));

    likeClickedDebounced.subscribe((id: string) => {
      this.onLike(id)
    })
  }
  
  //====
  onClickLike(id: string) {
    this.likeClicked$.next(id)
  }

  onLike(id: string) {
    if (this.buttonText === 'Like') {
      this.postService.likePost(id, this.userId).pipe(
        tap(() => { 
          this.buttonText = 'Unlike'
          this.numberOfLikes +=1;
        }),
      ).subscribe();
    }
    else {
      this.postService.likePost(id, this.userId).pipe(
        tap(() => { 
          this.buttonText = 'Like',
          this.numberOfLikes -=1;
         })
      ).subscribe()
    }
  }

  //===
  onDelete(id: string) {   
      this.postService.deletePost(id).pipe(
        tap(() => this.router.navigate(['/']))
      ).subscribe()
  }

  //===
  onEdit(id: string) {
    this.router.navigate([`${id}/modify`])
  }
}