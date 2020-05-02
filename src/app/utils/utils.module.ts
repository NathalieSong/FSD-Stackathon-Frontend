import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustToastComponent } from './cust-toast/cust-toast.component';
import { DeleteWithConfirmComponent } from './delete-with-confirm/delete-with-confirm.component';

@NgModule({
  declarations: [
    CustToastComponent,
    DeleteWithConfirmComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CustToastComponent,
    DeleteWithConfirmComponent
  ]
})
export class UtilsModule { }
