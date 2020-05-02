import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupAsSellerComponent } from './signup-as-seller.component';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from '../../auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('SignupAsSellerComponent', () => {
  let component: SignupAsSellerComponent;
  let fixture: ComponentFixture<SignupAsSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupAsSellerComponent ],
      imports: [
        CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupAsSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
