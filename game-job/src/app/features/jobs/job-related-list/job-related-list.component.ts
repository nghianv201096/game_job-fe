import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { JobDto } from 'src/app/models/jobs/job.dto';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-job-related-list',
  templateUrl: './job-related-list.component.html',
  styleUrls: ['./job-related-list.component.css'],
})
export class JobRelatedListComponent implements OnChanges {
  @Input() id!: number;
  jobs!: JobDto[];

  constructor(private jobService: JobService) {}
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id']) {
      var id = changes['id'].currentValue;
      if (!!id) {
        this.getRelatedJobs();
      } else {
        this.jobs = [];
      }
    }
  }

  getRelatedJobs() {
    this.jobService.getRelatedJobs(this.id).subscribe((rs) => {
      if (rs.success && rs.data) {
        this.jobs = rs.data;
      }
    });
  }
}
