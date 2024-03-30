import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickOutReturnComponent } from './pick-out-return.component';

describe('PickOutReturnComponent', () => {
  let component: PickOutReturnComponent;
  let fixture: ComponentFixture<PickOutReturnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PickOutReturnComponent]
    });
    fixture = TestBed.createComponent(PickOutReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
