import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoStateComponent } from './po-state.component';

describe('PoStateComponent', () => {
  let component: PoStateComponent;
  let fixture: ComponentFixture<PoStateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PoStateComponent]
    });
    fixture = TestBed.createComponent(PoStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
