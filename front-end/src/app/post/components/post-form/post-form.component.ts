import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

import { Post } from '../../models/post.model';
import { PostService } from '../../post.service';


@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  postForm!: FormGroup;
  postPreview$!: Observable<Post>;

  titleCtrl!: FormControl;
  textCtrl!: FormControl;

  imagePreview!: string;
  image!: File;



  constructor(private formBuilder: FormBuilder, 
              private auth: AuthService,
              private postService: PostService,
              private router: Router) { }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      postTitle: [null],
      postText: [null, Validators.required],
      image: [null, Validators.required],
    })

    this.postPreview$ = this.postForm.valueChanges.pipe(
      map(formValue => ({
        ...formValue,
      }))
    )
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
    const newPost = new Post();
    newPost.postTitle = this.postForm.get('postTitle')!.value;
    newPost.postText = this.postForm.get('postText')!.value;
    newPost.userId = this.auth.getUserId();

    this.image = this.postForm.get('image')!.value;

    const formData = new FormData();
    formData.append('post', JSON.stringify(newPost));
    formData.append('image', this.image);

    this.postService.createPost(formData).pipe(
      tap(() => {
        this.router.navigateByUrl('/');
      })
    ).subscribe();
  }
}
