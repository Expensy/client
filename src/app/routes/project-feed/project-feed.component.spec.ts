import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFeedComponent } from './project-feed.component';

describe('ProjectFeedComponent', () => {
  let component: ProjectFeedComponent;
  let fixture: ComponentFixture<ProjectFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
