import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfItemsComponent } from './list-of-items.component';
import { CommonModule } from '@angular/common';
import { ShoppingRoutingModule } from '../shopping-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UtilsModule } from '../../utils/utils.module';

describe('ListOfItemsComponent', () => {
  let component: ListOfItemsComponent;
  let fixture: ComponentFixture<ListOfItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfItemsComponent ],
      imports: [
        CommonModule,
        ShoppingRoutingModule,
        UtilsModule,
        ReactiveFormsModule,
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
