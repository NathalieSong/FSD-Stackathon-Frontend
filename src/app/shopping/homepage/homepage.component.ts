import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/general/models/item';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(public shopService: ShoppingService) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.shopService.getItems();
  }

}
