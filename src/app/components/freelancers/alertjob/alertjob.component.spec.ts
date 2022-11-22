import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertjobComponent } from './alertjob.component';

describe('AlertjobComponent', () => {
  let component: AlertjobComponent;
  let fixture: ComponentFixture<AlertjobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertjobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
