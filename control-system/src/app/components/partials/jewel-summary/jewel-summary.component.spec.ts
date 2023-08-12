import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JewelSummaryComponent } from './jewel-summary.component';

describe('JewelSummaryComponent', () => {
  let component: JewelSummaryComponent;
  let fixture: ComponentFixture<JewelSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JewelSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JewelSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
