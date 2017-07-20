import { TestBed, inject } from '@angular/core/testing';

import { ProjectResolveService } from './project-resolve.service';

describe('ProjectResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectResolveService]
    });
  });

  it('should be created', inject([ProjectResolveService], (service: ProjectResolveService) => {
    expect(service).toBeTruthy();
  }));
});
