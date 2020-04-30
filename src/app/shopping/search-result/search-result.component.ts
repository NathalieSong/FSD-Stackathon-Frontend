import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ShoppingService } from '../shopping.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Item } from 'src/app/general/models/item';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  searchText$: Observable<string>;
  items: Item[] = [];

  startprice = this.fb.control('');
  endprice = this.fb.control('');
  manufacturer = this.fb.control('');

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private shopService: ShoppingService
  ) { }

  ngOnInit(): void {
    this.getSearchText();
    this.getItemByText();
  }

  private getItemByText() {
    this.searchText$.subscribe(text => {
      this.shopService.getItemsByText(text).subscribe(items => this.items = items);
    });
  }

  private getSearchText() {
    this.searchText$ = this.activatedRoute.queryParamMap.pipe(map(params => params.get('searchText') || ''));
  }

  onClickSearch() {
    this.shopService.getItemsByFilter();
  }

}
