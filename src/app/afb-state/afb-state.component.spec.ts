import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfbStateComponent } from './afb-state.component';

describe('AfbStateComponent', () => {
  let component: AfbStateComponent;
  let fixture: ComponentFixture<AfbStateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AfbStateComponent]
    });
    fixture = TestBed.createComponent(AfbStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
