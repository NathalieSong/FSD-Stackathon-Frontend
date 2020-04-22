import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagementComponent } from './management/management.component';

const managementRoutes: Routes = [
  {
      path: '',
      component: ManagementComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(managementRoutes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { };
