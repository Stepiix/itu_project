import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewpayComponent } from './addnewpay.component';

describe('AddnewpayComponent', () => {
  let component: AddnewpayComponent;
  let fixture: ComponentFixture<AddnewpayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddnewpayComponent]
    });
    fixture = TestBed.createComponent(AddnewpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
