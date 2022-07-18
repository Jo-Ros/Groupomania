import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AuthService } from "../auth/auth.service";

import { Post } from "./models/post.model";

@Injectable()
export class PostService {

    posts$ = new Subject<Post[]>();

    constructor(private http: HttpClient,
                private authService: AuthService) {}

    createPost(post: Post, image: File) {
        const formData = new FormData();
        formData.append('post', JSON.stringify(post));
        formData.append('image', image);

        return this.http.post<Post>('http://localhost:3000/api/posts', formData)
    }

    getAllPosts() {
        return this.http.get<Post[]>('http://localhost:3000/api/posts')
    }

    getPostById(id: string) {
        return this.http.get<Post>(`http://localhost:3000/api/posts/${id}`)
    }

    likePost(id: string, userId: string) {
        return this.http.put<Post>(`http://localhost:3000/api/posts/${id}/like`, { userId: userId })
    }

    deletePost(id: string) {
        return this.http.delete<Post>(`http://localhost:3000/api/posts/${id}`)
    }
}