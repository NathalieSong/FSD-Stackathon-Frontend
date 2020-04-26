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
  roles = UserRole;
  signinForm = this.fb.group({
    role: ['buyer', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  get role() { return this.signinForm.get('role'); }

  get username() { return this.signinForm.get('username'); }

  get password() { return this.signinForm.get('password'); }

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  signIn() {
    switch (this.role.value) {
      case this.roles.BUYER: {
        this.authService.signinAsBuyer(this.username.value, this.password.value);
        this.router.navigate(['/shopping']);
        break;
      }
      case this.roles.SELLER: {
        this.authService.signinAsSeller(this.username.value, this.password.value);
        this.router.navigate(['/selling']);
        break;
      }
      case this.roles.ADMIN: {
        this.authService.signinAsAdmin(this.username.value, this.password.value);
        this.router.navigate(['/management']);
        break;
      }
    }
  }

}
