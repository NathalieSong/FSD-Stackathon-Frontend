import { Component, OnInit } from '@angular/core';
import { UserRole } from '../../general/enums/user-role.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  roles = UserRole;
  role = 'buyer';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onChangeRole(role: string) {
    this.role = role;
  }

  signup() {
    switch (this.role) {
      case this.roles.BUYER: {
        this.router.navigate(['/auth/signup/buyer']);
        break;
      }
      case this.roles.SELLER: {
        this.router.navigate(['/auth/signup/seller']);
        break;
      }
      case this.roles.ADMIN: {
        this.router.navigate(['/auth/signup/admin']);
        break;
      }
    }
  }

}
