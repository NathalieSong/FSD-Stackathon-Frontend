import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellingComponent } from './selling.component';
import { CommonModule } from '@angular/common';
import { SellingRoutingModule } from './selling-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UtilsModule } from '../utils/utils.module';
import { AppRoutingModule } from '../app-routing.module';

describe('SellingComponent', () => {
  let component: SellingComponent;
  let fixture: ComponentFixture<SellingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellingComponent ],
      imports: [
        CommonModule,
        SellingRoutingModule,
        UtilsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
