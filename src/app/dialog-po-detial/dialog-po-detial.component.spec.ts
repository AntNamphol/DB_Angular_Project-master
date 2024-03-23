import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPoDetialComponent } from './dialog-po-detial.component';

describe('DialogPoDetialComponent', () => {
  let component: DialogPoDetialComponent;
  let fixture: ComponentFixture<DialogPoDetialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogPoDetialComponent]
    });
    fixture = TestBed.createComponent(DialogPoDetialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
