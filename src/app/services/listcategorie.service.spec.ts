import { TestBed } from '@angular/core/testing';

import { ListcategorieService } from './listcategorie.service';

describe('ListcategorieService', () => {
  let service: ListcategorieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListcategorieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
