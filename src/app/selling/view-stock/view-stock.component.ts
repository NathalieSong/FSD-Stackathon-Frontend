import { Component, OnInit } from '@angular/core';
import { SellingService } from '../selling.service';
import { Observable } from 'rxjs';
import { StockItem } from 'src/app/general/models/stock-item';

@Component({
  selector: 'app-view-stock',
  templateUrl: './view-stock.component.html',
  styleUrls: ['./view-stock.component.scss']
})
export class ViewStockComponent implements OnInit {
  items$: Observable<StockItem[]>;

  constructor(private sellService: SellingService) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.items$ = this.sellService.getStockItems();
  }

}
