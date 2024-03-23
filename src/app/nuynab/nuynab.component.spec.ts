import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuynabComponent } from './nuynab.component';

describe('NuynabComponent', () => {
  let component: NuynabComponent;
  let fixture: ComponentFixture<NuynabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuynabComponent]
    });
    fixture = TestBed.createComponent(NuynabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
