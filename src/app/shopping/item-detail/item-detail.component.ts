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

  onClickBtn() {
    this.router.navigate(['/shopping/cart']);
  }

  backToResults() {
    this.location.back();
  }

  getListOfQuantity(stock: number) {
    return stock ? _.range(1, stock + 1) : [1];
  }

}
