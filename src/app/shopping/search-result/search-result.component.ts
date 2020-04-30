import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ShoppingService } from '../shopping.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Item } from 'src/app/general/models/item';
import { ItemFilter } from 'src/app/general/models/item-filter';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  searchText$: Observable<string>;
  items: Item[] = [];
  pricePattern = '[0-9\.]*';

  startprice = this.fb.control('', Validators.pattern(this.pricePattern));
  endprice = this.fb.control('', Validators.pattern(this.pricePattern));
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
    const filter: ItemFilter = {
      startPrice: this.startprice.value,
      endPrice: this.endprice.value,
      manufacturer: this.manufacturer.value
    };
    this.shopService.getItemsByFilter(filter).subscribe(items => this.items = items);
  }

}
