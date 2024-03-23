import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryafbComponent } from './historyafb.component';

describe('HistoryafbComponent', () => {
  let component: HistoryafbComponent;
  let fixture: ComponentFixture<HistoryafbComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryafbComponent]
    });
    fixture = TestBed.createComponent(HistoryafbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
