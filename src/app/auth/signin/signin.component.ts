import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRole } from '../../general/enums/user-role.enum';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  errorSignin = false;
  loading = false;
  roles = UserRole;
  signinForm = this.fb.group({
    role: ['buyer'],
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  get role() { return this.signinForm.get('role'); }
  get username() { return this.signinForm.get('username'); }
  get password() { return this.signinForm.get('password'); }

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.doTrimOfForm();
    if (this.signinForm.valid) {
      this.signin();
    }
  }

  doTrimOfForm() {
    this.signinForm.setValue({
      role: this.role.value,
      username: this.username.value.trim(),
      password: this.password.value.trim()
    });
  }

  signin() {
    switch (this.role.value) {
      case this.roles.BUYER: {
        this.signinAsBuyer();
        break;
      }
      case this.roles.SELLER: {
        this.signinAsSeller();
        break;
      }
    }
  }

  signinAsBuyer() {
    const that = this;
    this.loading = true;
    this.authService.signinAsBuyer(this.username.value, this.password.value)
    .subscribe({
      next(buyers) {
        if (buyers.length) {
          that.errorSignin = false;
          that.router.navigate(['/shopping']);
        } else {
          that.errorSignin = true;
        }
      },
      error(err) { that.errorSignin = true; },
      complete() { that.loading = false; }
    });
  }

  signinAsSeller() {
    const that = this;
    this.loading = true;
    this.authService.signinAsSeller(this.username.value, this.password.value)
    .subscribe({
      next(sellers) {
        if (sellers.length) {
          that.errorSignin = false;
          that.router.navigate(['/selling']);
        } else {
          that.errorSignin = true;
        }
      },
      error(err) { that.errorSignin = true; },
      complete() { that.loading = false; }
    });
  }

}
