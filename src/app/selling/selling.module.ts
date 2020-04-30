import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellingComponent } from './selling.component';
import { SellingRoutingModule } from './selling-routing.module';
import { ViewStockComponent } from './view-stock/view-stock.component';
import { AddItemComponent } from './add-item/add-item.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { ReportComponent } from './report/report.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    SellingComponent,
    ViewStockComponent,
    AddItemComponent,
    EditItemComponent,
    ReportComponent
  ],
  imports: [
    CommonModule,
    SellingRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class SellingModule { }
