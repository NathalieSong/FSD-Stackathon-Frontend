import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageNotFoundComponent } from './general/page-not-found/page-not-found.component';
import { AuthModule } from './auth/auth.module';
import { RepasswordDirective } from './general/directives/repassword.directive';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    RepasswordDirective,
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
