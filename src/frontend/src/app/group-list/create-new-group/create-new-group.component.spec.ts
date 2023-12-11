import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewGroupComponent } from './create-new-group.component';

describe('CreateNewGroupComponent', () => {
  let component: CreateNewGroupComponent;
  let fixture: ComponentFixture<CreateNewGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateNewGroupComponent]
    });
    fixture = TestBed.createComponent(CreateNewGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
