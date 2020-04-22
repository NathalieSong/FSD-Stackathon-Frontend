import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SellingComponent } from './selling/selling.component';

const sellingRoutes: Routes = [
  {
      path: '',
      component: SellingComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(sellingRoutes)],
  exports: [RouterModule]
})
export class SellingRoutingModule { };
