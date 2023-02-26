import { TestBed } from '@angular/core/testing';

import { CustomerPageService } from './customer-page.service';

describe('CustomerPageService', () => {
  let service: CustomerPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
