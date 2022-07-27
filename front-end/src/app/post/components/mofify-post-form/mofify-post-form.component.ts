import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Post } from '../../models/post.model';
import { PostService } from '../../post.service';

@Component({
  selector: 'app-mofify-post-form',
  templateUrl: './mofify-post-form.component.html',
  styleUrls: ['./mofify-post-form.component.scss']
})
export class MofifyPostFormComponent implements OnInit {
  postForm!: FormGroup;
  post$!: Observable<Post>;

  titleCtrl!: FormControl;
  textCtrl!: FormControl;

  imagePreview!: string;
  postId!: string;
  image!: File;


  constructor(private formBuilder: FormBuilder,
              private auth: AuthService,
              private postService: PostService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      postTitle: [null],
      postText: [null],
      image: [null],
    })

    this.postId = this.activatedRoute.snapshot.params['id'];
    this.postService.getPostById(this.postId).pipe(
      tap((post => {
        console.log(post);
        this.imagePreview = post.image;

        this.postForm = this.formBuilder.group({
          postTitle: [post.postTitle],
          postText: [post.postText],
          image: [post.image],
        })
      }))
    ).subscribe()
  }

  onFileSelected(event: Event) {
    const file: File = (event.target as HTMLInputElement).files![0];

    this.postForm.get('image')!.setValue(file);
    this.postForm.updateValueAndValidity();
    
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file)
    }
  }

  onSubmitForm() {
    const modifiedPost = new Post();
    modifiedPost.postTitle = this.postForm.get('postTitle')!.value;
    modifiedPost.postText = this.postForm.get('postText')!.value;
    modifiedPost.userId = this.auth.getUserId();

    this.postService.updatePost(modifiedPost, this.postForm.get('image')!.value, this.postId)
    .pipe(
      tap(() => {
        this.router.navigateByUrl('/');
      })
    ).subscribe();
  }
}
