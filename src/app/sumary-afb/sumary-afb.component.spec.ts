import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumaryAfbComponent } from './sumary-afb.component';

describe('SumaryAfbComponent', () => {
  let component: SumaryAfbComponent;
  let fixture: ComponentFixture<SumaryAfbComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SumaryAfbComponent]
    });
    fixture = TestBed.createComponent(SumaryAfbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
