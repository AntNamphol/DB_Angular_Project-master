import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfbMenuComponent } from './afb-menu.component';

describe('AfbMenuComponent', () => {
  let component: AfbMenuComponent;
  let fixture: ComponentFixture<AfbMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AfbMenuComponent]
    });
    fixture = TestBed.createComponent(AfbMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
