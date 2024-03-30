import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotItemComponent } from './slot-item.component';

describe('SlotItemComponent', () => {
  let component: SlotItemComponent;
  let fixture: ComponentFixture<SlotItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SlotItemComponent]
    });
    fixture = TestBed.createComponent(SlotItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
