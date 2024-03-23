import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickInOrderComponent } from './pick-in-order.component';

describe('PickInOrderComponent', () => {
  let component: PickInOrderComponent;
  let fixture: ComponentFixture<PickInOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PickInOrderComponent]
    });
    fixture = TestBed.createComponent(PickInOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
