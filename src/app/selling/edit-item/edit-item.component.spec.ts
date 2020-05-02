import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditItemComponent } from './edit-item.component';
import { CommonModule } from '@angular/common';
import { SellingRoutingModule } from '../selling-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UtilsModule } from '../../utils/utils.module';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('EditItemComponent', () => {
  let component: EditItemComponent;
  let fixture: ComponentFixture<EditItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditItemComponent ],
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
    fixture = TestBed.createComponent(EditItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
