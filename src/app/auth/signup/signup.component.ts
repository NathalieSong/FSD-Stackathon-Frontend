import { Component, OnInit } from '@angular/core';
import { UserRole } from '../../general/enums/user-role.enum';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  roles = UserRole;
  role = this.fb.control('buyer');

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
