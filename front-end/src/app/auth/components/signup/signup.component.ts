import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm!: FormGroup;

  usernameCtrl!: FormControl;
  emailCtrl!: FormControl;
  passwordCtrl!: FormControl;

  constructor(private formBuilder: FormBuilder,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.usernameCtrl = this.formBuilder.control('', Validators.required);
    this.emailCtrl = this.formBuilder.control('', [Validators.required, Validators.email]);
    this.passwordCtrl = this.formBuilder.control('', [Validators.required, Validators.minLength(6)]);

    this.signUpForm = this.formBuilder.group({
      username: this.usernameCtrl,
      email: this.emailCtrl,
      password: this.passwordCtrl,
    })
  }

  getCtrlErrorText(ctrl: AbstractControl) {
    return this.auth.getFormControlErrorText(ctrl);
  }

  onSubmit() {
    this.auth.registerNewUser(this.signUpForm.value).pipe(
      switchMap(() => this.auth.loginUser(this.signUpForm.value)),
      tap(saved => {
        if (saved) {
          this.router.navigate(['/']);
        }
      })
    ).subscribe()
  }

}
