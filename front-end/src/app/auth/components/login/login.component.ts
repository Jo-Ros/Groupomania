import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    this.emailCtrl = this.formBuilder.control('', [Validators.required, Validators.email]);
    this.passwordCtrl = this.formBuilder.control('', [Validators.required, Validators.minLength(6)]);

    this.loginForm = this.formBuilder.group({
      email: this.emailCtrl,
      password: this.passwordCtrl,
    })
  }

  getCtrlErrorText(ctrl: AbstractControl) {
    return this.auth.getFormControlErrorText(ctrl);
  }

  onSubmit() {
    this.auth.loginUser(this.loginForm.value).pipe(
      tap(connected => {
        if (connected) {
          this.router.navigateByUrl('/');
        }
      })
    ).subscribe()
  }
}
