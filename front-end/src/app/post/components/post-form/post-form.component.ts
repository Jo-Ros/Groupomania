import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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

  fileName = '';
  imagePreview!: string;



  constructor(private formBuilder: FormBuilder, 
              private http: HttpClient,
              private auth: AuthService,
              private postService: PostService,
              private router: Router) { }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      postTitle: [null],
      postText: [null],
      image: [null],
      
    })

    this.postPreview$ = this.postForm.valueChanges.pipe(
      map(formValue => ({
        ...formValue,
        createdDate: new Date(),
        usersIdLiked: ['']
      }))
    )
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0]

    this.postForm.get('image')!.setValue(file);
    this.postForm.updateValueAndValidity();
    
    if (file) {
      this.fileName = file.name;
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

    console.log(this.postForm.get('image')!.value);
    console.log(newPost.userId);
    console.log(this.auth.getToken());

    this.postService.createPost(newPost, this.postForm.get('image')!.value).pipe(
      tap(() => {
        this.router.navigateByUrl('/')
      })
    ).subscribe();
  }

}
