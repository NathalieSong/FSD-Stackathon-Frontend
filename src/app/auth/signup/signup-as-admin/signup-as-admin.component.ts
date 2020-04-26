import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { repasswordValidator } from 'src/app/general/directives/repassword.directive';
import { AuthService } from '../../auth.service';
import { Admin } from 'src/app/general/models/admin';

@Component({
  selector: 'app-signup-as-admin',
  templateUrl: './signup-as-admin.component.html',
  styleUrls: ['./signup-as-admin.component.scss']
})
export class SignupAsAdminComponent implements OnInit {
  signupForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    repassword: ['', Validators.required],
    email: ['', Validators.required],
    contactnumber: ['', Validators.required]
  }, { validators: repasswordValidator });

  get username() { return this.signupForm.get('username'); }
  get password() { return this.signupForm.get('password'); }
  get repassword() { return this.signupForm.get('repassword'); }
  get email() { return this.signupForm.get('email'); }
  get contactnumber() { return this.signupForm.get('contactnumber'); }

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.doTrimOfForm();
    if (this.signupForm.valid) {
      this.signup();
    }
  }

  doTrimOfForm() {
    this.signupForm.setValue({
      username: this.username.value.trim(),
      password: this.password.value.trim(),
      repassword: this.repassword.value.trim(),
      email: this.email.value.trim(),
      contactnumber: this.contactnumber.value.trim()
    });
  }

  signup() {
    this.authService.signupAsAdmin(this.getAdminInfo());
    this.router.navigate(['/management']);
  }

  getAdminInfo(): Admin {
    const admin = new Admin();
    admin.username = this.username.value;
    admin.password = this.password.value;
    admin.email = this.email.value;
    admin.contactNumber = this.contactnumber.value;
    return admin;
  }
}
