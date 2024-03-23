import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewPrdComponent } from './add-new-prd.component';

describe('AddNewPrdComponent', () => {
  let component: AddNewPrdComponent;
  let fixture: ComponentFixture<AddNewPrdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewPrdComponent]
    });
    fixture = TestBed.createComponent(AddNewPrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
