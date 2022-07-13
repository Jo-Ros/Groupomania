import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { switchMap, tap } from 'rxjs';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm!: FormGroup;

  //usernameCtrl!: FormControl;
  emailCtrl!: FormControl;
  passwordCtrl!: FormControl;

  constructor(private formBuilder: FormBuilder,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.initSignUpForm();
  }

  private initSignUpForm() {
    this.signUpForm = this.formBuilder.group({
      //username: this.usernameCtrl,
      email: this.emailCtrl,
      password: this.passwordCtrl,
    })
  }

  onSubmit() {
    this.auth.registerNewUser(this.signUpForm.value).pipe(
      switchMap(() => this.auth.loginUser(this.signUpForm.value)),
      tap(saved => {
        if (saved) {
          this.signUpForm.reset();
          console.log('User Has Been Saved');
        }
      })
    ).subscribe()
  }

}
