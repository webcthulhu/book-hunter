import { Component, HostBinding, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { slideInOutAnimation } from '../animations';
import { AuthService } from '../auth.service';

export interface Auth {
  email: string;
  password: string;
  username?: string;
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [ slideInOutAnimation ]
})
export class AuthComponent implements OnInit {
  @HostBinding('@slideInOutAnimation') '';
  public progress = false;
  public step = 'auth';
  public signInForm: FormGroup;
  public signUpForm: FormGroup;
  constructor(private auth: AuthService, private fb: FormBuilder, private snackbar: MatSnackBar) {}
  ngOnInit() {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  onSignIn(model: Auth) {
    this.progress = true;
    this.auth.signIn(model)
      .then(() => {
        this.progress = false;
      })
      .catch(reason => {
        this.progress = false;
        this.snackbar.open(reason.message, 'OK', { duration: 3000 });
      });
  }
  onSignUp(model: Auth) {
    this.progress = true;
    this.auth.signUp(model)
      .then(() => {
        this.progress = false;
      })
      .catch(reason => {
        this.progress = false;
        this.snackbar.open(reason.message, 'OK', { duration: 3000 });
      });
  }
}
