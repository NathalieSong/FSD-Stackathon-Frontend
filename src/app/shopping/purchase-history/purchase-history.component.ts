import { Component, OnInit } from '@angular/core';
import { PurchaseHistoryItem } from 'src/app/general/models/purchase-history-item';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss']
})
export class PurchaseHistoryComponent implements OnInit {
  items: Array<PurchaseHistoryItem> = [];

  constructor(private shopService: ShoppingService) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.items = this.shopService.getPurchaseHistoryList();
  }

}
