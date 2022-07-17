import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, tap } from "rxjs";
import { userModel } from "./models/user.model";


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    isAuth$ = new BehaviorSubject<boolean>(false);
    token = '';
    userId = '';

    constructor(private http: HttpClient, 
                private router: Router) {}

    getToken() {
        return this.token
    }

    getUserId() {
        return this.userId;
    }

    registerNewUser( formValue: userModel) {
        return this.http.post<userModel>(`http://localhost:3000/api/auth/signup`, formValue)
    }

    loginUser( formValue: userModel ) {
        return this.http.post<{ userId: string, token: string}>(`http://localhost:3000/api/auth/login`, formValue).pipe(
            tap(({ userId, token }) => {
                this.userId = userId;
                this.token = token;
                this.isAuth$.next(true);
            })
        )
    }

    logOut() {
        this.userId = '';
        this.token = '';
        this.isAuth$.next(false);
        this.router.navigate(['/auth/login']);
    }
}