import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMapItemComponent } from './dialog-map-item.component';

describe('DialogMapItemComponent', () => {
  let component: DialogMapItemComponent;
  let fixture: ComponentFixture<DialogMapItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogMapItemComponent]
    });
    fixture = TestBed.createComponent(DialogMapItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
