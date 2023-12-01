import { TestBed } from '@angular/core/testing';

import { ServiceGroupListService } from './service-group-list.service';

describe('ServiceGroupListService', () => {
  let service: ServiceGroupListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceGroupListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
