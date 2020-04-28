import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { repasswordValidator } from 'src/app/general/directives/repassword.directive';
import { AuthService } from '../../auth.service';
import { Seller } from 'src/app/general/models/seller';

@Component({
  selector: 'app-signup-as-seller',
  templateUrl: './signup-as-seller.component.html',
  styleUrls: ['./signup-as-seller.component.scss']
})
export class SignupAsSellerComponent implements OnInit {
  errorSignup = false;
  signupForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    repassword: ['', Validators.required],
    email: ['', Validators.required],
    address: ['', Validators.required],
    contactnumber: ['', Validators.required],
    companyname: ['', Validators.required],
    companydesc: ['', Validators.required],
    gstin: ['', Validators.required]
  }, { validators: repasswordValidator });

  get username() { return this.signupForm.get('username'); }
  get password() { return this.signupForm.get('password'); }
  get repassword() { return this.signupForm.get('repassword'); }
  get email() { return this.signupForm.get('email'); }
  get address() { return this.signupForm.get('address'); }
  get contactnumber() { return this.signupForm.get('contactnumber'); }
  get companyname() { return this.signupForm.get('companyname'); }
  get companydesc() { return this.signupForm.get('companydesc'); }
  get gstin() { return this.signupForm.get('gstin'); }

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
      contactnumber: this.contactnumber.value.trim(),
      companyname: this.companyname.value.trim(),
      companydesc: this.companydesc.value.trim(),
      gstin: this.gstin.value.trim()
    });
  }

  signup() {
    const that = this;
    this.authService.signupAsSeller(this.getSellerInfo()).subscribe({
      next(newSeller) {
        that.errorSignup = false;
        that.router.navigate(['/selling']);
      },
      error(err) {
        that.errorSignup = true;
      }
    });
  }

  private getSellerInfo(): Seller {
    const seller = new Seller();
    seller.username = this.username.value;
    seller.password = this.password.value;
    seller.email = this.email.value;
    seller.address = this.address.value;
    seller.contactNumber = this.contactnumber.value;
    seller.companyName = this.companyname.value;
    seller.companyDescription = this.companydesc.value;
    seller.GSTIN = Number(this.gstin.value);
    return seller;
  }
}
