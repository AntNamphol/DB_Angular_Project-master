import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditChanwangComponent } from './dialog-edit-chanwang.component';

describe('DialogEditChanwangComponent', () => {
  let component: DialogEditChanwangComponent;
  let fixture: ComponentFixture<DialogEditChanwangComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEditChanwangComponent]
    });
    fixture = TestBed.createComponent(DialogEditChanwangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
