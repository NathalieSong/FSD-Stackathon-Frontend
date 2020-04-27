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
        const that = this;
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
            error(err) { that.errorSignin = true; }
          });
        break;
      }
      case this.roles.SELLER: {
        this.authService.signinAsSeller(this.username.value, this.password.value);
        this.router.navigate(['/selling']);
        break;
      }
    }
  }

}
