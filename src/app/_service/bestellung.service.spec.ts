import { TestBed } from '@angular/core/testing';

import { BestellungService } from './bestellung.service';

describe('BestellungService', () => {
  let service: BestellungService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BestellungService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
