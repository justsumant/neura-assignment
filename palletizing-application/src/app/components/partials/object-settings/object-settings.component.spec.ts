import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectSettingsComponent } from './object-settings.component';

describe('ObjectSettingsComponent', () => {
  let component: ObjectSettingsComponent;
  let fixture: ComponentFixture<ObjectSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjectSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
