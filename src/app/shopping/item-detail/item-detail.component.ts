import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Item } from 'src/app/general/models/item';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ShoppingService } from '../shopping.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {
  item$: Observable<Item>;
  isAddingToCart = false;
  isBuyingNow = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private shopService: ShoppingService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getItemById();
  }

  private getItemById() {
    this.item$ = this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.shopService.getItemById(params.get('itemId')))
    );
  }

  backToResults() {
    this.location.back();
  }

  getListOfStock(stock: number) {
    return stock ? _.range(1, stock + 1) : [1];
  }

  addToCart(item: Item) {
    this.isAddingToCart = true;
    const that = this;
    this.shopService.addToCart(item).subscribe({
      next(id) { },
      error(err) { },
      complete() { that.isAddingToCart = false; }
    });
  }

  buyNow(item: Item) {
    this.isBuyingNow = true;
    const that = this;
    this.shopService.addToCart(item).subscribe({
      next(id) { that.router.navigate(['/shopping/cart'], {queryParams: {cartId: id}}); },
      error(err) { },
      complete() { that.isBuyingNow = false; }
    });
  }

}
