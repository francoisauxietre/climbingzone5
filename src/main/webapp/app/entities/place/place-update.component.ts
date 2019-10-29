import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPlace, Place } from 'app/shared/model/place.model';
import { PlaceService } from './place.service';
import { IParking } from 'app/shared/model/parking.model';
import { ParkingService } from 'app/entities/parking/parking.service';
import { IClimbingRoute } from 'app/shared/model/climbing-route.model';
import { ClimbingRouteService } from 'app/entities/climbing-route/climbing-route.service';

@Component({
  selector: 'jhi-place-update',
  templateUrl: './place-update.component.html'
})
export class PlaceUpdateComponent implements OnInit {
  isSaving: boolean;

  parkings: IParking[];

  climbingroutes: IClimbingRoute[];

  editForm = this.fb.group({
    id: [],
    name: [],
    latitude: [],
    longitude: [],
    parkingsId: [],
    locatedId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected placeService: PlaceService,
    protected parkingService: ParkingService,
    protected climbingRouteService: ClimbingRouteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ place }) => {
      this.updateForm(place);
    });
    this.parkingService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IParking[]>) => mayBeOk.ok),
        map((response: HttpResponse<IParking[]>) => response.body)
      )
      .subscribe((res: IParking[]) => (this.parkings = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.climbingRouteService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IClimbingRoute[]>) => mayBeOk.ok),
        map((response: HttpResponse<IClimbingRoute[]>) => response.body)
      )
      .subscribe((res: IClimbingRoute[]) => (this.climbingroutes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(place: IPlace) {
    this.editForm.patchValue({
      id: place.id,
      name: place.name,
      latitude: place.latitude,
      longitude: place.longitude,
      parkingsId: place.parkingsId,
      locatedId: place.locatedId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const place = this.createFromForm();
    if (place.id !== undefined) {
      this.subscribeToSaveResponse(this.placeService.update(place));
    } else {
      this.subscribeToSaveResponse(this.placeService.create(place));
    }
  }

  private createFromForm(): IPlace {
    return {
      ...new Place(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      latitude: this.editForm.get(['latitude']).value,
      longitude: this.editForm.get(['longitude']).value,
      parkingsId: this.editForm.get(['parkingsId']).value,
      locatedId: this.editForm.get(['locatedId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlace>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackParkingById(index: number, item: IParking) {
    return item.id;
  }

  trackClimbingRouteById(index: number, item: IClimbingRoute) {
    return item.id;
  }
}
