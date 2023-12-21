import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplyListComponent } from './job-apply-list.component';

describe('JobApplyListComponent', () => {
  let component: JobApplyListComponent;
  let fixture: ComponentFixture<JobApplyListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobApplyListComponent]
    });
    fixture = TestBed.createComponent(JobApplyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
