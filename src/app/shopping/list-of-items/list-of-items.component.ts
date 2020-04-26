import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/general/models/item';

@Component({
  selector: 'app-list-of-items',
  templateUrl: './list-of-items.component.html',
  styleUrls: ['./list-of-items.component.scss']
})
export class ListOfItemsComponent implements OnInit {
  @Input() items: Array<Item> = [];

  constructor() { }

  ngOnInit(): void {
  }

}
