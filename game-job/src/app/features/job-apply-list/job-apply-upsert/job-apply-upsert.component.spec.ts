import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplyUpsertComponent } from './job-apply-upsert.component';

describe('JobApplyUpsertComponent', () => {
  let component: JobApplyUpsertComponent;
  let fixture: ComponentFixture<JobApplyUpsertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobApplyUpsertComponent]
    });
    fixture = TestBed.createComponent(JobApplyUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
