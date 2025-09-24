import { TestBed } from '@angular/core/testing';

import { HandelServiceService } from './handel-service.service';

describe('HandelServiceService', () => {
  let service: HandelServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandelServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
