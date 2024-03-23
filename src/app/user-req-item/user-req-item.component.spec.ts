import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReqItemComponent } from './user-req-item.component';

describe('UserReqItemComponent', () => {
  let component: UserReqItemComponent;
  let fixture: ComponentFixture<UserReqItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserReqItemComponent]
    });
    fixture = TestBed.createComponent(UserReqItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
