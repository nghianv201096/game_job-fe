import { Component, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { JobDto } from 'src/app/models/jobs/job.dto';
import { ClipboardService } from 'ngx-clipboard';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-job-list-item',
  templateUrl: './job-list-item.component.html',
  styleUrls: ['./job-list-item.component.css'],
})
export class JobListItemComponent {
  @Input() job!: JobDto;

  constructor(private router: Router, private clipboardService: ClipboardService, @Inject(DOCUMENT) private document: Document) {}

  viewDetail() {
    this.router.navigate(['tin-tuyen-dung', 'chi-tiet', this.job.id]);
  }

  copyToClipboard(job: JobDto) {
    this.clipboardService.copyFromContent(`${this.document.location.origin}/tin-tuyen-dung/chi-tiet/${job.id}`);
  }
}
