import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Item } from 'src/app/general/models/item';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  startprice = this.fb.control('');
  endprice = this.fb.control('');
  manufacturer = this.fb.control('');

  constructor(private fb: FormBuilder, public shopService: ShoppingService) { }

  ngOnInit(): void {
  }

  onClickSearch() {
    this.shopService.getItemsByFilter();
  }

}
