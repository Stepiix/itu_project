import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymenthistoryComponent } from './paymenthistory.component';

describe('PaymenthistoryComponent', () => {
  let component: PaymenthistoryComponent;
  let fixture: ComponentFixture<PaymenthistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymenthistoryComponent]
    });
    fixture = TestBed.createComponent(PaymenthistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
