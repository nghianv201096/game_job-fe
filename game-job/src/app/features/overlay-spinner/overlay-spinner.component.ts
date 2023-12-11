import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'lib-overlay-spinner',
  templateUrl: './overlay-spinner.component.html',
  styleUrls: ['./overlay-spinner.component.css'],
})
export class OverlaySpinnerComponent implements OnInit {
  public showOverlay: boolean;
  constructor(private commonService: CommonService) {
    this.showOverlay = false;
  }

  ngOnInit(): void {
    this.commonService.showOverlayChanged.subscribe((showOverlay: boolean) => {
      this.showOverlay = showOverlay;
    });
  }
}
