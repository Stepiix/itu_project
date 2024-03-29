
/*
Authors: Tomas Valik (xvalik04)
         Stepan Barta (xbarta50)
         Milan Takac (xtakac09)
*/

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsidegroupComponent } from './insidegroup.component';

describe('InsidegroupComponent', () => {
  let component: InsidegroupComponent;
  let fixture: ComponentFixture<InsidegroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsidegroupComponent]
    });
    fixture = TestBed.createComponent(InsidegroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
