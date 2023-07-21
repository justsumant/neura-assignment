import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalletTypeComponent } from './pallet-type.component';

describe('PalletTypeComponent', () => {
  let component: PalletTypeComponent;
  let fixture: ComponentFixture<PalletTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PalletTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PalletTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
