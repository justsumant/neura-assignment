import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalletAreaComponent } from './pallet-area.component';

describe('PalletAreaComponent', () => {
  let component: PalletAreaComponent;
  let fixture: ComponentFixture<PalletAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PalletAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PalletAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
