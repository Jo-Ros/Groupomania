import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  emailCtrl!: FormControl;
  passwordCtrl!: FormControl;

  constructor(private formBuilder: FormBuilder,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.initLoginForm();
  }

  private initLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: this.emailCtrl,
      password: this.passwordCtrl,
    })
  }

  onSubmit() {
    this.auth.loginUser(this.loginForm.value).pipe(
      tap(connected => {
        if (connected) {
          this.loginForm.reset();
          this.router.navigateByUrl('/');
          console.log('User Has Been connected');
        }
      })
    ).subscribe()
  }

}
