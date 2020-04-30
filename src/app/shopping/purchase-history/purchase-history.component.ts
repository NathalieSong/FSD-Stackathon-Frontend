import { Component, OnInit } from '@angular/core';
import { PurchaseHistoryItem } from 'src/app/general/models/purchase-history-item';
import { ShoppingService } from '../shopping.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss']
})
export class PurchaseHistoryComponent implements OnInit {
  purchaseItems$: Observable<PurchaseHistoryItem[]>;

  constructor(private shopService: ShoppingService) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.purchaseItems$ = this.shopService.getPurchaseHistoryList();
  }

}
