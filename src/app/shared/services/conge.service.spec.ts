import { TestBed } from '@angular/core/testing';

import { CongeService } from './conge.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CongeService', () => {
  let service: CongeService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule], });
    service = TestBed.inject(CongeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
