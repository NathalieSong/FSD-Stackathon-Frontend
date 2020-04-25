import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupAsBuyerComponent } from './signup-as-buyer.component';

describe('SignupAsBuyerComponent', () => {
  let component: SignupAsBuyerComponent;
  let fixture: ComponentFixture<SignupAsBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupAsBuyerComponent ]
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
