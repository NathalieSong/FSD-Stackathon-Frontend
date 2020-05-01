import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SellingComponent } from './selling.component';
import { ViewStockComponent } from './view-stock/view-stock.component';
import { AddItemComponent } from './add-item/add-item.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { ReportComponent } from './report/report.component';

const sellingRoutes: Routes = [
  {
      path: '',
      component: SellingComponent,
      children: [
        {
          path: 'view-stock',
          component: ViewStockComponent
        },
        {
          path: 'add-item',
          component: AddItemComponent
        },
        {
          path: 'edit-item/:itemId',
          component: EditItemComponent
        },
        {
          path: 'report',
          component: ReportComponent
        },
        {
          path: '',
          redirectTo: 'view-stock',
          pathMatch: 'full'
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(sellingRoutes)],
  exports: [RouterModule]
})
export class SellingRoutingModule { }
