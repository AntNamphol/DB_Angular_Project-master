import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditSlotComponent } from './dialog-edit-slot.component';

describe('DialogEditSlotComponent', () => {
  let component: DialogEditSlotComponent;
  let fixture: ComponentFixture<DialogEditSlotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEditSlotComponent]
    });
    fixture = TestBed.createComponent(DialogEditSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
