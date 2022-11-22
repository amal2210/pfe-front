import { TestBed } from '@angular/core/testing';

import { ListOfCompanyService } from './list-of-company.service';

describe('ListOfCompanyService', () => {
  let service: ListOfCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListOfCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
