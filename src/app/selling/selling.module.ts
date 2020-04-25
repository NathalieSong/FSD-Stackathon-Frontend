import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellingComponent } from './selling.component';
import { SellingRoutingModule } from './selling-routing.module';

@NgModule({
  declarations: [
    SellingComponent
  ],
  imports: [
    CommonModule,
    SellingRoutingModule
  ]
})
export class SellingModule { }
