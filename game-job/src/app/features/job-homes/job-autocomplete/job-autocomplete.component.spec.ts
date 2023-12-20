import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAutocompleteComponent } from './job-autocomplete.component';

describe('JobAutocompleteComponent', () => {
  let component: JobAutocompleteComponent;
  let fixture: ComponentFixture<JobAutocompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobAutocompleteComponent]
    });
    fixture = TestBed.createComponent(JobAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
