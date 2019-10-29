import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IClimbingRoute } from 'app/shared/model/climbing-route.model';

@Component({
  selector: 'jhi-climbing-route-detail',
  templateUrl: './climbing-route-detail.component.html'
})
export class ClimbingRouteDetailComponent implements OnInit {
  climbingRoute: IClimbingRoute;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ climbingRoute }) => {
      this.climbingRoute = climbingRoute;
    });
  }

  previousState() {
    window.history.back();
  }
}
