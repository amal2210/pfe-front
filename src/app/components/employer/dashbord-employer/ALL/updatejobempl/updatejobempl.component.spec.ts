import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatejobemplComponent } from './updatejobempl.component';

describe('UpdatejobemplComponent', () => {
  let component: UpdatejobemplComponent;
  let fixture: ComponentFixture<UpdatejobemplComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatejobemplComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatejobemplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
