import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ShoppingService } from './shopping.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {
  searchText = this.fb.control('');

  constructor(private fb: FormBuilder, private router: Router, private shopService: ShoppingService) { }

  ngOnInit(): void {
  }

  onClickSearch() {
    this.shopService.getItemsByText(this.searchText.value);
    this.router.navigate(['/shopping/search-result']);
  }

}
