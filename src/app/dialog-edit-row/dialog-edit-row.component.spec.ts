import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditRowComponent } from './dialog-edit-row.component';

describe('DialogEditRowComponent', () => {
  let component: DialogEditRowComponent;
  let fixture: ComponentFixture<DialogEditRowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEditRowComponent]
    });
    fixture = TestBed.createComponent(DialogEditRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
