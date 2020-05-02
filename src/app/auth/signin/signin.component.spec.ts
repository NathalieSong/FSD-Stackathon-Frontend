import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninComponent } from './signin.component';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from '../auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigninComponent ],
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
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the input username and password from the page', () => {
    const username: HTMLInputElement = fixture.nativeElement.querySelector('#username');
    const password: HTMLInputElement = fixture.nativeElement.querySelector('#password');
    username.value = 'testbuyer';
    username.dispatchEvent(new Event('input'));
    password.value = 'testbuyerpwd';
    password.dispatchEvent(new Event('input'));

    expect(component.signinForm.get('username').value).toBe('testbuyer');
    expect(component.signinForm.get('password').value).toBe('testbuyerpwd');
  });
});
