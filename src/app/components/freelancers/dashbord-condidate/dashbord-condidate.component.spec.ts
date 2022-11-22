import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordCondidateComponent } from './dashbord-condidate.component';

describe('DashbordCondidateComponent', () => {
  let component: DashbordCondidateComponent;
  let fixture: ComponentFixture<DashbordCondidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbordCondidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashbordCondidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
