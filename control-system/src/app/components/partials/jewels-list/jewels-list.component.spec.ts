import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JewelsListComponent } from './jewels-list.component';

describe('JewelsListComponent', () => {
  let component: JewelsListComponent;
  let fixture: ComponentFixture<JewelsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JewelsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JewelsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
