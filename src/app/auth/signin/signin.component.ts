import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  get username() { return this.signinForm.get('username'); }

  get password() { return this.signinForm.get('password'); }

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  signIn() {
    this.router.navigate(['/shopping']);
  }

}
