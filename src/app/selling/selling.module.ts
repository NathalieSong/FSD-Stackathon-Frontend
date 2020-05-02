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
import { UploadPictureModalComponent } from './upload-picture-modal/upload-picture-modal.component';
import { UtilsModule } from '../utils/utils.module';

@NgModule({
  declarations: [
    SellingComponent,
    ViewStockComponent,
    AddItemComponent,
    EditItemComponent,
    ReportComponent,
    UploadPictureModalComponent
  ],
  imports: [
    CommonModule,
    SellingRoutingModule,
    UtilsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class SellingModule { }
