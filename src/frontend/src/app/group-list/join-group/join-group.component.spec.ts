import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinGroupComponent } from './join-group.component';

describe('JoinGroupComponent', () => {
  let component: JoinGroupComponent;
  let fixture: ComponentFixture<JoinGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JoinGroupComponent]
    });
    fixture = TestBed.createComponent(JoinGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
