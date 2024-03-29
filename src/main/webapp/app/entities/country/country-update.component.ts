import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICountry, Country } from 'app/shared/model/country.model';
import { CountryService } from './country.service';
import { IClimber } from 'app/shared/model/climber.model';
import { ClimberService } from 'app/entities/climber/climber.service';

@Component({
  selector: 'jhi-country-update',
  templateUrl: './country-update.component.html'
})
export class CountryUpdateComponent implements OnInit {
  isSaving: boolean;

  climbers: IClimber[];

  editForm = this.fb.group({
    id: [],
    name: [],
    climbersId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected countryService: CountryService,
    protected climberService: ClimberService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ country }) => {
      this.updateForm(country);
    });
    this.climberService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IClimber[]>) => mayBeOk.ok),
        map((response: HttpResponse<IClimber[]>) => response.body)
      )
      .subscribe((res: IClimber[]) => (this.climbers = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(country: ICountry) {
    this.editForm.patchValue({
      id: country.id,
      name: country.name,
      climbersId: country.climbersId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const country = this.createFromForm();
    if (country.id !== undefined) {
      this.subscribeToSaveResponse(this.countryService.update(country));
    } else {
      this.subscribeToSaveResponse(this.countryService.create(country));
    }
  }

  private createFromForm(): ICountry {
    return {
      ...new Country(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      climbersId: this.editForm.get(['climbersId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICountry>>) {
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

  trackClimberById(index: number, item: IClimber) {
    return item.id;
  }
}
