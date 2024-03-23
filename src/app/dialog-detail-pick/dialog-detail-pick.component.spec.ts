import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDetailPickComponent } from './dialog-detail-pick.component';

describe('DialogDetailPickComponent', () => {
  let component: DialogDetailPickComponent;
  let fixture: ComponentFixture<DialogDetailPickComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogDetailPickComponent]
    });
    fixture = TestBed.createComponent(DialogDetailPickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
