import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { userModel } from "./models/user.model";


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) {}

    registerNewUser( formValue: userModel) {
        return this.http.post<userModel>(`http://localhost:3000/api/auth/signup`, formValue)
    }

    loginUser( formValue: userModel ) {
        return this.http.post<userModel>(`http://localhost:3000/api/auth/login`, formValue)
    }
}