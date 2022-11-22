import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangepassCompanyComponent } from './changepass-company.component';

describe('ChangepassCompanyComponent', () => {
  let component: ChangepassCompanyComponent;
  let fixture: ComponentFixture<ChangepassCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangepassCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangepassCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
