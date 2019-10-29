import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IClimber, Climber } from 'app/shared/model/climber.model';
import { ClimberService } from './climber.service';
import { ICard } from 'app/shared/model/card.model';
import { CardService } from 'app/entities/card/card.service';
import { IClimbingRoute } from 'app/shared/model/climbing-route.model';
import { ClimbingRouteService } from 'app/entities/climbing-route/climbing-route.service';

@Component({
  selector: 'jhi-climber-update',
  templateUrl: './climber-update.component.html'
})
export class ClimberUpdateComponent implements OnInit {
  isSaving: boolean;

  cards: ICard[];

  climbingroutes: IClimbingRoute[];

  climbers: IClimber[];

  editForm = this.fb.group({
    id: [],
    firstName: [],
    lastName: [],
    birth: [],
    createdAt: [],
    modifiedAt: [],
    deletedAt: [],
    language: [],
    cardsId: [],
    openById: [],
    friends: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected climberService: ClimberService,
    protected cardService: CardService,
    protected climbingRouteService: ClimbingRouteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ climber }) => {
      this.updateForm(climber);
    });
    this.cardService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICard[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICard[]>) => response.body)
      )
      .subscribe((res: ICard[]) => (this.cards = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.climbingRouteService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IClimbingRoute[]>) => mayBeOk.ok),
        map((response: HttpResponse<IClimbingRoute[]>) => response.body)
      )
      .subscribe((res: IClimbingRoute[]) => (this.climbingroutes = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.climberService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IClimber[]>) => mayBeOk.ok),
        map((response: HttpResponse<IClimber[]>) => response.body)
      )
      .subscribe((res: IClimber[]) => (this.climbers = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(climber: IClimber) {
    this.editForm.patchValue({
      id: climber.id,
      firstName: climber.firstName,
      lastName: climber.lastName,
      birth: climber.birth != null ? climber.birth.format(DATE_TIME_FORMAT) : null,
      createdAt: climber.createdAt != null ? climber.createdAt.format(DATE_TIME_FORMAT) : null,
      modifiedAt: climber.modifiedAt != null ? climber.modifiedAt.format(DATE_TIME_FORMAT) : null,
      deletedAt: climber.deletedAt != null ? climber.deletedAt.format(DATE_TIME_FORMAT) : null,
      language: climber.language,
      cardsId: climber.cardsId,
      openById: climber.openById,
      friends: climber.friends
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const climber = this.createFromForm();
    if (climber.id !== undefined) {
      this.subscribeToSaveResponse(this.climberService.update(climber));
    } else {
      this.subscribeToSaveResponse(this.climberService.create(climber));
    }
  }

  private createFromForm(): IClimber {
    return {
      ...new Climber(),
      id: this.editForm.get(['id']).value,
      firstName: this.editForm.get(['firstName']).value,
      lastName: this.editForm.get(['lastName']).value,
      birth: this.editForm.get(['birth']).value != null ? moment(this.editForm.get(['birth']).value, DATE_TIME_FORMAT) : undefined,
      createdAt:
        this.editForm.get(['createdAt']).value != null ? moment(this.editForm.get(['createdAt']).value, DATE_TIME_FORMAT) : undefined,
      modifiedAt:
        this.editForm.get(['modifiedAt']).value != null ? moment(this.editForm.get(['modifiedAt']).value, DATE_TIME_FORMAT) : undefined,
      deletedAt:
        this.editForm.get(['deletedAt']).value != null ? moment(this.editForm.get(['deletedAt']).value, DATE_TIME_FORMAT) : undefined,
      language: this.editForm.get(['language']).value,
      cardsId: this.editForm.get(['cardsId']).value,
      openById: this.editForm.get(['openById']).value,
      friends: this.editForm.get(['friends']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClimber>>) {
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

  trackCardById(index: number, item: ICard) {
    return item.id;
  }

  trackClimbingRouteById(index: number, item: IClimbingRoute) {
    return item.id;
  }

  trackClimberById(index: number, item: IClimber) {
    return item.id;
  }

  getSelected(selectedVals: any[], option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
