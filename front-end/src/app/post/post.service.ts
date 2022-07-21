import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

import { Post } from "./models/post.model";

@Injectable()
export class PostService {

    constructor(private http: HttpClient) {}

    createPost(formData: FormData) {
        return this.http.post<Post>(`${environment.API_URL}/api/posts`, formData);
    }

    getAllPosts() {
        return this.http.get<Post[]>(`${environment.API_URL}/api/posts`);
    }

    getPostById(id: string) {
        return this.http.get<Post>(`${environment.API_URL}/api/posts/${id}`);
    }

    likePost(id: string, userId: string) {
        return this.http.put<Post>(`${environment.API_URL}/api/posts/${id}/like`, { userId: userId });
    }

    deletePost(id: string) {
        return this.http.delete<Post>(`${environment.API_URL}/api/posts/${id}`);
    }

    updatePost(updatedPost: Post, image: string | File, postId: string) {
        if (typeof image === 'string') {
            return this.http.put<Post>(`${environment.API_URL}/api/posts/${postId}/`, updatedPost);
        }
        else {
            const formData = new FormData();
            formData.append('post', JSON.stringify(updatedPost));
            formData.append('image', image);
    
            return this.http.put<Post>(`${environment.API_URL}/api/posts/${postId}/`, formData);
        }
    }
}