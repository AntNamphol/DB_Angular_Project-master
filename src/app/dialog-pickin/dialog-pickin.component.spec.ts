import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPickinComponent } from './dialog-pickin.component';

describe('DialogPickinComponent', () => {
  let component: DialogPickinComponent;
  let fixture: ComponentFixture<DialogPickinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogPickinComponent]
    });
    fixture = TestBed.createComponent(DialogPickinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
