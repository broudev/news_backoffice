import { TestBed } from '@angular/core/testing';

import { QuoideneufTreatmentsService } from './quoideneuf-treatments.service';

describe('QuoideneufTreatmentsService', () => {
  let service: QuoideneufTreatmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuoideneufTreatmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
