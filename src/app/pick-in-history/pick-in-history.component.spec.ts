import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickInHistoryComponent } from './pick-in-history.component';

describe('PickInHistoryComponent', () => {
  let component: PickInHistoryComponent;
  let fixture: ComponentFixture<PickInHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PickInHistoryComponent]
    });
    fixture = TestBed.createComponent(PickInHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
