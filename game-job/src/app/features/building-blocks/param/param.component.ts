import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-param',
  templateUrl: './param.component.html',
  styleUrls: ['./param.component.css']
})
export class ParamComponent {
  data = {
    snapshot: {
      param: 'N/A',
      queryParam: 'N/A',
      fragment: 'N/A'
    },
    subcribe: {
      param: 'N/A',
      queryParam: 'N/A',
      fragment: 'N/A'
    }
  };

  constructor(private activatedRoute : ActivatedRoute) {
    const sn = this.activatedRoute.snapshot;
    this.data.snapshot = {
      param: sn.params['p'] ?? 'N/A',
      queryParam: sn.queryParams['qp'] ?? 'N/A',
      fragment: sn.fragment ?? 'N/A'
    };

    this.activatedRoute.params.subscribe(p => {
      this.data.subcribe.param = p['p'] ?? 'N/A';
    });

    this.activatedRoute.queryParams.subscribe(qp => {
      this.data.subcribe.queryParam = qp['qp'] ?? 'N/A';
    });

    this.activatedRoute.fragment.subscribe(f => {
      this.data.subcribe.fragment = f ?? 'N/A';
    });
  }
}
