import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { userModel } from "./models/user.model";


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    isAuth$ = new BehaviorSubject<boolean>(false);
    token = '';
    userId = '';
    userRole = '';

    constructor(private http: HttpClient, 
                private router: Router) {}

    getToken() {
        return this.token
    }

    getUserId() {
        return this.userId;
    }

    getUserRole() {
        return this.userRole;
    }

    registerNewUser( formValue: userModel) {
        return this.http.post<userModel>(`${environment.API_URL}/api/auth/signup`, formValue)
    }

    loginUser( formValue: userModel ) {
        return this.http.post<{ userId: string, token: string, userRole: string}>(`${environment.API_URL}/api/auth/login`, formValue).pipe(
            tap(({ userId, token, userRole }) => {
                this.userId = userId;
                this.token = token;
                this.userRole = userRole;
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