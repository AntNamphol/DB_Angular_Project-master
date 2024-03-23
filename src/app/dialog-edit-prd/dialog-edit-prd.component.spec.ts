import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditPrdComponent } from './dialog-edit-prd.component';

describe('DialogEditPrdComponent', () => {
  let component: DialogEditPrdComponent;
  let fixture: ComponentFixture<DialogEditPrdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEditPrdComponent]
    });
    fixture = TestBed.createComponent(DialogEditPrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
