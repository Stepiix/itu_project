import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettledebtComponent } from './settledebt.component';

describe('SettledebtComponent', () => {
  let component: SettledebtComponent;
  let fixture: ComponentFixture<SettledebtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettledebtComponent]
    });
    fixture = TestBed.createComponent(SettledebtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
