import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobUpsertComponent } from './job-upsert.component';

describe('JobUpsertComponent', () => {
  let component: JobUpsertComponent;
  let fixture: ComponentFixture<JobUpsertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobUpsertComponent]
    });
    fixture = TestBed.createComponent(JobUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
