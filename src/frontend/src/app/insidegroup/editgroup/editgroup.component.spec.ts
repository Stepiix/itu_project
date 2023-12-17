/*
Author: Tomas Valik (xvalik04)
*/
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditgroupComponent } from './editgroup.component';

describe('EditgroupComponent', () => {
  let component: EditgroupComponent;
  let fixture: ComponentFixture<EditgroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditgroupComponent]
    });
    fixture = TestBed.createComponent(EditgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
