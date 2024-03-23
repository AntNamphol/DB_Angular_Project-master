import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditNuynabComponent } from './dialog-edit-nuynab.component';

describe('DialogEditNuynabComponent', () => {
  let component: DialogEditNuynabComponent;
  let fixture: ComponentFixture<DialogEditNuynabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEditNuynabComponent]
    });
    fixture = TestBed.createComponent(DialogEditNuynabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
