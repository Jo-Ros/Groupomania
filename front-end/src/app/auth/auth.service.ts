import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";
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
    };

    getFormControlErrorText(ctrl: AbstractControl) {
        if (ctrl.hasError('required')) {
          return 'Ce champs est requis';
        }
        else if (ctrl.hasError('email')) {
          return 'Merci d\'entrer une adresse mail valide';
        }
        else if (ctrl.hasError('minlength')) {
          return 'Votre mot de passe doit contenir au minimum 6 caractères';
        }
        else {
          return 'Ce champs contient une erreur';
        }
      }
}