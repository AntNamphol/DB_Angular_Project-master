import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPermisionUserComponent } from './edit-permision-user.component';

describe('EditPermisionUserComponent', () => {
  let component: EditPermisionUserComponent;
  let fixture: ComponentFixture<EditPermisionUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPermisionUserComponent]
    });
    fixture = TestBed.createComponent(EditPermisionUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
