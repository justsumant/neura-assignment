import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddObjectButtonGroupComponent } from './add-object-button-group.component';

describe('AddObjectButtonGroupComponent', () => {
  let component: AddObjectButtonGroupComponent;
  let fixture: ComponentFixture<AddObjectButtonGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddObjectButtonGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddObjectButtonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
