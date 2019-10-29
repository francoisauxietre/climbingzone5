import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IClimber } from 'app/shared/model/climber.model';

@Component({
  selector: 'jhi-climber-detail',
  templateUrl: './climber-detail.component.html'
})
export class ClimberDetailComponent implements OnInit {
  climber: IClimber;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ climber }) => {
      this.climber = climber;
    });
  }

  previousState() {
    window.history.back();
  }
}
