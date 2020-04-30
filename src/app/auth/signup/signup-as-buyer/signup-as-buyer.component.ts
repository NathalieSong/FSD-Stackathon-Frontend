import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { repasswordValidator } from 'src/app/general/directives/repassword.directive';
import { AuthService } from '../../auth.service';
import { Buyer } from 'src/app/general/models/buyer';

@Component({
  selector: 'app-signup-as-buyer',
  templateUrl: './signup-as-buyer.component.html',
  styleUrls: ['./signup-as-buyer.component.scss']
})
export class SignupAsBuyerComponent implements OnInit {
  errorSignup = false;
  loading = false;
  signupForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    repassword: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],
    mobile: ['', Validators.required]
  }, { validators: repasswordValidator });

  get username() { return this.signupForm.get('username'); }
  get password() { return this.signupForm.get('password'); }
  get repassword() { return this.signupForm.get('repassword'); }
  get email() { return this.signupForm.get('email'); }
  get address() { return this.signupForm.get('address'); }
  get mobile() { return this.signupForm.get('mobile'); }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.doTrimOfForm();
    if (this.signupForm.valid) {
      this.signup();
    }
  }

  private doTrimOfForm() {
    this.signupForm.setValue({
      username: this.username.value.trim(),
      password: this.password.value.trim(),
      repassword: this.repassword.value.trim(),
      email: this.email.value.trim(),
      address: this.address.value.trim(),
      mobile: this.mobile.value.trim()
    });
  }

  signup() {
    const that = this;
    this.loading = true;
    this.authService.signupAsBuyer(this.getBuyerInfo()).subscribe({
      next(newBuyer) {
        that.errorSignup = false;
        that.router.navigate(['/shopping']);
      },
      error(err) {
        that.errorSignup = true;
      },
      complete() {
        that.loading = false;
      }
    });
  }

  private getBuyerInfo(): Buyer {
    const buyer = new Buyer();
    buyer.username = this.username.value;
    buyer.password = this.password.value;
    buyer.email = this.email.value;
    buyer.address = this.address.value;
    buyer.mobile = this.mobile.value;
    return buyer;
  }
}
