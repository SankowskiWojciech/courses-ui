import { TestBed } from '@angular/core/testing';

import { StatusInformationService } from './status-information.service';

describe('StatusInformationService', () => {
  let service: StatusInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
