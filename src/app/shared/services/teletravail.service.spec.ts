import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TeletravailService } from './teletravail.service';

describe('TeletravailService', () => {
  let service: TeletravailService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule], });
    service = TestBed.inject(TeletravailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
