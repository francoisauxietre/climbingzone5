import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IClimbingRoute, ClimbingRoute } from 'app/shared/model/climbing-route.model';
import { ClimbingRouteService } from './climbing-route.service';

@Component({
  selector: 'jhi-climbing-route-update',
  templateUrl: './climbing-route-update.component.html'
})
export class ClimbingRouteUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: [],
    bonus: [],
    latitude: [],
    longitude: [],
    difficuty: [],
    star: [],
    physical: [],
    technical: [],
    tactical: [],
    mental: [],
    createdAt: [],
    modifiedAt: [],
    deletedAt: [],
    routeType: [],
    zouneType: []
  });

  constructor(protected climbingRouteService: ClimbingRouteService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ climbingRoute }) => {
      this.updateForm(climbingRoute);
    });
  }

  updateForm(climbingRoute: IClimbingRoute) {
    this.editForm.patchValue({
      id: climbingRoute.id,
      name: climbingRoute.name,
      bonus: climbingRoute.bonus,
      latitude: climbingRoute.latitude,
      longitude: climbingRoute.longitude,
      difficuty: climbingRoute.difficuty,
      star: climbingRoute.star,
      physical: climbingRoute.physical,
      technical: climbingRoute.technical,
      tactical: climbingRoute.tactical,
      mental: climbingRoute.mental,
      createdAt: climbingRoute.createdAt != null ? climbingRoute.createdAt.format(DATE_TIME_FORMAT) : null,
      modifiedAt: climbingRoute.modifiedAt != null ? climbingRoute.modifiedAt.format(DATE_TIME_FORMAT) : null,
      deletedAt: climbingRoute.deletedAt != null ? climbingRoute.deletedAt.format(DATE_TIME_FORMAT) : null,
      routeType: climbingRoute.routeType,
      zouneType: climbingRoute.zouneType
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const climbingRoute = this.createFromForm();
    if (climbingRoute.id !== undefined) {
      this.subscribeToSaveResponse(this.climbingRouteService.update(climbingRoute));
    } else {
      this.subscribeToSaveResponse(this.climbingRouteService.create(climbingRoute));
    }
  }

  private createFromForm(): IClimbingRoute {
    return {
      ...new ClimbingRoute(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      bonus: this.editForm.get(['bonus']).value,
      latitude: this.editForm.get(['latitude']).value,
      longitude: this.editForm.get(['longitude']).value,
      difficuty: this.editForm.get(['difficuty']).value,
      star: this.editForm.get(['star']).value,
      physical: this.editForm.get(['physical']).value,
      technical: this.editForm.get(['technical']).value,
      tactical: this.editForm.get(['tactical']).value,
      mental: this.editForm.get(['mental']).value,
      createdAt:
        this.editForm.get(['createdAt']).value != null ? moment(this.editForm.get(['createdAt']).value, DATE_TIME_FORMAT) : undefined,
      modifiedAt:
        this.editForm.get(['modifiedAt']).value != null ? moment(this.editForm.get(['modifiedAt']).value, DATE_TIME_FORMAT) : undefined,
      deletedAt:
        this.editForm.get(['deletedAt']).value != null ? moment(this.editForm.get(['deletedAt']).value, DATE_TIME_FORMAT) : undefined,
      routeType: this.editForm.get(['routeType']).value,
      zouneType: this.editForm.get(['zouneType']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClimbingRoute>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
