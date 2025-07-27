import { TestBed } from '@angular/core/testing';

import { RoleGaurd } from './role-gaurd';

describe('RoleGaurd', () => {
  let service: RoleGaurd;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleGaurd);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
