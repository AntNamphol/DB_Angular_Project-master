import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickOutHisComponent } from './pick-out-his.component';

describe('PickOutHisComponent', () => {
  let component: PickOutHisComponent;
  let fixture: ComponentFixture<PickOutHisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PickOutHisComponent]
    });
    fixture = TestBed.createComponent(PickOutHisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
