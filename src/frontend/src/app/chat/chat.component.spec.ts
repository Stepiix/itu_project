// Author: Milan Takac (xtakac09)

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ChatComponent } from './chat.component';

@Component({
  template: `
    <div style="position: fixed; bottom: 50; left: 50;">
      <app-chat></app-chat>
    </div>
  `,
})
class TestHostComponent {}

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatComponent, TestHostComponent],
    });

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    // Získej instanci komponenty, kterou testujeme
    const chatDebugElement = fixture.debugElement.children[0];
    component = chatDebugElement.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});