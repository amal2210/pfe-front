import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyprofilComponent } from './companyprofil.component';

describe('CompanyprofilComponent', () => {
  let component: CompanyprofilComponent;
  let fixture: ComponentFixture<CompanyprofilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyprofilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyprofilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
