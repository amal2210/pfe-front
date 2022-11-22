import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendToactiveComponent } from './attend-toactive.component';

describe('AttendToactiveComponent', () => {
  let component: AttendToactiveComponent;
  let fixture: ComponentFixture<AttendToactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendToactiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendToactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
