import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCondidateComponent } from './detail-condidate.component';

describe('DetailCondidateComponent', () => {
  let component: DetailCondidateComponent;
  let fixture: ComponentFixture<DetailCondidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailCondidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCondidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
