import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ICard, Card } from 'app/shared/model/card.model';
import { CardService } from './card.service';

@Component({
  selector: 'jhi-card-update',
  templateUrl: './card-update.component.html'
})
export class CardUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    cardId: [],
    star: [],
    level: [],
    qrcode: [],
    climberPlace: [],
    climberTotal: [],
    place: [],
    photo: [],
    climbingRouteName: [],
    physical: [],
    technical: [],
    tactical: [],
    mental: [],
    bonus: [],
    climberFirstName: [],
    climberLastName: []
  });

  constructor(protected cardService: CardService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ card }) => {
      this.updateForm(card);
    });
  }

  updateForm(card: ICard) {
    this.editForm.patchValue({
      id: card.id,
      cardId: card.cardId,
      star: card.star,
      level: card.level,
      qrcode: card.qrcode,
      climberPlace: card.climberPlace,
      climberTotal: card.climberTotal,
      place: card.place,
      photo: card.photo,
      climbingRouteName: card.climbingRouteName,
      physical: card.physical,
      technical: card.technical,
      tactical: card.tactical,
      mental: card.mental,
      bonus: card.bonus,
      climberFirstName: card.climberFirstName,
      climberLastName: card.climberLastName
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const card = this.createFromForm();
    if (card.id !== undefined) {
      this.subscribeToSaveResponse(this.cardService.update(card));
    } else {
      this.subscribeToSaveResponse(this.cardService.create(card));
    }
  }

  private createFromForm(): ICard {
    return {
      ...new Card(),
      id: this.editForm.get(['id']).value,
      cardId: this.editForm.get(['cardId']).value,
      star: this.editForm.get(['star']).value,
      level: this.editForm.get(['level']).value,
      qrcode: this.editForm.get(['qrcode']).value,
      climberPlace: this.editForm.get(['climberPlace']).value,
      climberTotal: this.editForm.get(['climberTotal']).value,
      place: this.editForm.get(['place']).value,
      photo: this.editForm.get(['photo']).value,
      climbingRouteName: this.editForm.get(['climbingRouteName']).value,
      physical: this.editForm.get(['physical']).value,
      technical: this.editForm.get(['technical']).value,
      tactical: this.editForm.get(['tactical']).value,
      mental: this.editForm.get(['mental']).value,
      bonus: this.editForm.get(['bonus']).value,
      climberFirstName: this.editForm.get(['climberFirstName']).value,
      climberLastName: this.editForm.get(['climberLastName']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICard>>) {
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
