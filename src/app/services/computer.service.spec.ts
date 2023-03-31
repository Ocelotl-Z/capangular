import { TestBed } from '@angular/core/testing';

import { ComputerService } from './computer.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ComputerService', () => {
  let service: ComputerService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(ComputerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
