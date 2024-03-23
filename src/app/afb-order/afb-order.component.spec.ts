import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfbOrderComponent } from './afb-order.component';

describe('AfbOrderComponent', () => {
  let component: AfbOrderComponent;
  let fixture: ComponentFixture<AfbOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AfbOrderComponent]
    });
    fixture = TestBed.createComponent(AfbOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
