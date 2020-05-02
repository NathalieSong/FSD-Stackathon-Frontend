import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupAsBuyerComponent } from './signup-as-buyer.component';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from '../../auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('SignupAsBuyerComponent', () => {
  let component: SignupAsBuyerComponent;
  let fixture: ComponentFixture<SignupAsBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupAsBuyerComponent ],
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
    fixture = TestBed.createComponent(SignupAsBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
