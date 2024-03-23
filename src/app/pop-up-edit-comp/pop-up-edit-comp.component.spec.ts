import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpEditCompComponent } from './pop-up-edit-comp.component';

describe('PopUpEditCompComponent', () => {
  let component: PopUpEditCompComponent;
  let fixture: ComponentFixture<PopUpEditCompComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopUpEditCompComponent]
    });
    fixture = TestBed.createComponent(PopUpEditCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
