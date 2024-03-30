import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickinSuccComponent } from './pickin-succ.component';

describe('PickinSuccComponent', () => {
  let component: PickinSuccComponent;
  let fixture: ComponentFixture<PickinSuccComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PickinSuccComponent]
    });
    fixture = TestBed.createComponent(PickinSuccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
