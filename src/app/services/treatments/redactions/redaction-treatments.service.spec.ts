import { TestBed } from '@angular/core/testing';

import { RedactionTreatmentsService } from './redaction-treatments.service';

describe('RedactionTreatmentsService', () => {
  let service: RedactionTreatmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RedactionTreatmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
