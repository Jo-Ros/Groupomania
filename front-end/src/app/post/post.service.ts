import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Post } from "./models/post.model";

@Injectable()
export class PostService {

    constructor(private http: HttpClient,) {}

    createPost(post: Post, image: File) {
        const formData = new FormData();
        formData.append('post', JSON.stringify(post));
        formData.append('image', image);

        return this.http.post<Post>('http://localhost:3000/api/posts', formData)
    
    }
}