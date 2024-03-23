import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoItemComponent } from './po-item.component';

describe('PoItemComponent', () => {
  let component: PoItemComponent;
  let fixture: ComponentFixture<PoItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PoItemComponent]
    });
    fixture = TestBed.createComponent(PoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
