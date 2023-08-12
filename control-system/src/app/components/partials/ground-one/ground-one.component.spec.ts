import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroundOneComponent } from './ground-one.component';

describe('GroundOneComponent', () => {
  let component: GroundOneComponent;
  let fixture: ComponentFixture<GroundOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroundOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroundOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
