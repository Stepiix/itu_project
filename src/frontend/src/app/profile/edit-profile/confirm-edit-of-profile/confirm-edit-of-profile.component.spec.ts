import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmEditOfProfileComponent } from './confirm-edit-of-profile.component';

describe('ConfirmEditOfProfileComponent', () => {
  let component: ConfirmEditOfProfileComponent;
  let fixture: ComponentFixture<ConfirmEditOfProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmEditOfProfileComponent]
    });
    fixture = TestBed.createComponent(ConfirmEditOfProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
