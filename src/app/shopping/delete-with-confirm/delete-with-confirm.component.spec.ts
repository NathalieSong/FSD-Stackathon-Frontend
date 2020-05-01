import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteWithConfirmComponent } from './delete-with-confirm.component';

describe('DeleteWithConfirmComponent', () => {
  let component: DeleteWithConfirmComponent;
  let fixture: ComponentFixture<DeleteWithConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteWithConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteWithConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
