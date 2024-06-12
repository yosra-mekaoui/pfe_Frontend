import { TestBed } from '@angular/core/testing';

import { TeletravailService } from './teletravail.service';

describe('TeletravailService', () => {
  let service: TeletravailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeletravailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
