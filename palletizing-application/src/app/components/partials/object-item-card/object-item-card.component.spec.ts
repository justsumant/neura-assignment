import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectItemCardComponent } from './object-item-card.component';

describe('ObjectItemCardComponent', () => {
  let component: ObjectItemCardComponent;
  let fixture: ComponentFixture<ObjectItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectItemCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjectItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
