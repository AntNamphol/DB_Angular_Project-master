import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialohEditTypeComponent } from './dialoh-edit-type.component';

describe('DialohEditTypeComponent', () => {
  let component: DialohEditTypeComponent;
  let fixture: ComponentFixture<DialohEditTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialohEditTypeComponent]
    });
    fixture = TestBed.createComponent(DialohEditTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
