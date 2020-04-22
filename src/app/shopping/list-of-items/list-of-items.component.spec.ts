import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfItemsComponent } from './list-of-items.component';

describe('ListOfItemsComponent', () => {
  let component: ListOfItemsComponent;
  let fixture: ComponentFixture<ListOfItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfItemsComponent ]
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
