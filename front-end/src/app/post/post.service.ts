import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Post } from "./models/post.model";

@Injectable()
export class PostService {

    constructor(private http: HttpClient) {}

    createPost(formData: FormData) {
        return this.http.post<Post>('http://localhost:3000/api/posts', formData);
    }

    getAllPosts() {
        return this.http.get<Post[]>('http://localhost:3000/api/posts');
    }

    getPostById(id: string) {
        return this.http.get<Post>(`http://localhost:3000/api/posts/${id}`);
    }

    likePost(id: string, userId: string) {
        return this.http.put<Post>(`http://localhost:3000/api/posts/${id}/like`, { userId: userId });
    }

    deletePost(id: string) {
        return this.http.delete<Post>(`http://localhost:3000/api/posts/${id}`);
    }

    updatePost(updatedPost: Post, image: string | File, postId: string) {
        if (typeof image === 'string') {
            return this.http.put<Post>(`http://localhost:3000/api/posts/${postId}/`, updatedPost);
        }
        else {
            const formData = new FormData();
            formData.append('post', JSON.stringify(updatedPost));
            formData.append('image', image);
    
            return this.http.put<Post>(`http://localhost:3000/api/posts/${postId}/`, formData);
        }
    }
}