import { TestBed } from '@angular/core/testing';

import { SkillService } from "./Skill.service";

describe('SkillService', () => {
  let service: SkillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
