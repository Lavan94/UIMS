import { TestBed } from '@angular/core/testing';

import { ZoneStyleFactoryService } from './zone-style-factory.service';

describe('ZoneStyleFactoryService', () => {
  let service: ZoneStyleFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZoneStyleFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
