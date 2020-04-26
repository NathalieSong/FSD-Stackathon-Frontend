import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClickBtn() {
    this.router.navigate(['/shopping/cart']);
  }

}
