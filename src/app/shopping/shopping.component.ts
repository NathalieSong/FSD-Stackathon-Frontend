import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {
  searchText = this.fb.control('');

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onClickSearch() {
    this.router.navigate(['/shopping/search-result'], {queryParams: {searchText: this.searchText.value}});
  }

  onClickSignOut() {
    this.authService.isBuyer = false;
  }

}
