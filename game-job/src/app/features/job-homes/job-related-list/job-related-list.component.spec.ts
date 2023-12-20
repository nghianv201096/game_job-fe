import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobRelatedListComponent } from './job-related-list.component';

describe('JobRelatedListComponent', () => {
  let component: JobRelatedListComponent;
  let fixture: ComponentFixture<JobRelatedListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobRelatedListComponent]
    });
    fixture = TestBed.createComponent(JobRelatedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
