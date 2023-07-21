import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeInputsComponent } from './range-inputs.component';

describe('RangeInputsComponent', () => {
  let component: RangeInputsComponent;
  let fixture: ComponentFixture<RangeInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RangeInputsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RangeInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
