import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobManagementListComponent } from './job-management-list.component';

describe('JobManagementListComponent', () => {
  let component: JobManagementListComponent;
  let fixture: ComponentFixture<JobManagementListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobManagementListComponent]
    });
    fixture = TestBed.createComponent(JobManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
