import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChanwangComponent } from './chanwang.component';

describe('ChanwangComponent', () => {
  let component: ChanwangComponent;
  let fixture: ComponentFixture<ChanwangComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChanwangComponent]
    });
    fixture = TestBed.createComponent(ChanwangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
