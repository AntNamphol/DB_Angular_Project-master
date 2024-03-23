import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAfbComponent } from './dialog-afb.component';

describe('DialogAfbComponent', () => {
  let component: DialogAfbComponent;
  let fixture: ComponentFixture<DialogAfbComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAfbComponent]
    });
    fixture = TestBed.createComponent(DialogAfbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
