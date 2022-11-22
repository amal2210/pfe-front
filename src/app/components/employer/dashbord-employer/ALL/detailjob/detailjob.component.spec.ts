import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailjobComponent } from './detailjob.component';

describe('DetailjobComponent', () => {
  let component: DetailjobComponent;
  let fixture: ComponentFixture<DetailjobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailjobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
