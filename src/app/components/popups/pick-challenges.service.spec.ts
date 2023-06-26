import { TestBed } from '@angular/core/testing';

import { PickChallengesService } from './pick-challenges.service';

describe('PickChallengesService', () => {
  let service: PickChallengesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PickChallengesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
