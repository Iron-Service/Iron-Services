/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserShopsComponent } from './user-hops.component';

describe('UserShopsComponent', () => {
  let component: UserShopsComponent;
  let fixture: ComponentFixture<UserShopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserShopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserShopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
