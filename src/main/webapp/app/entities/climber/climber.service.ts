import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IClimber } from 'app/shared/model/climber.model';

type EntityResponseType = HttpResponse<IClimber>;
type EntityArrayResponseType = HttpResponse<IClimber[]>;

@Injectable({ providedIn: 'root' })
export class ClimberService {
  public resourceUrl = SERVER_API_URL + 'api/climbers';

  constructor(protected http: HttpClient) {}

  create(climber: IClimber): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(climber);
    return this.http
      .post<IClimber>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(climber: IClimber): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(climber);
    return this.http
      .put<IClimber>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IClimber>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IClimber[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(climber: IClimber): IClimber {
    const copy: IClimber = Object.assign({}, climber, {
      birth: climber.birth != null && climber.birth.isValid() ? climber.birth.toJSON() : null,
      createdAt: climber.createdAt != null && climber.createdAt.isValid() ? climber.createdAt.toJSON() : null,
      modifiedAt: climber.modifiedAt != null && climber.modifiedAt.isValid() ? climber.modifiedAt.toJSON() : null,
      deletedAt: climber.deletedAt != null && climber.deletedAt.isValid() ? climber.deletedAt.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.birth = res.body.birth != null ? moment(res.body.birth) : null;
      res.body.createdAt = res.body.createdAt != null ? moment(res.body.createdAt) : null;
      res.body.modifiedAt = res.body.modifiedAt != null ? moment(res.body.modifiedAt) : null;
      res.body.deletedAt = res.body.deletedAt != null ? moment(res.body.deletedAt) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((climber: IClimber) => {
        climber.birth = climber.birth != null ? moment(climber.birth) : null;
        climber.createdAt = climber.createdAt != null ? moment(climber.createdAt) : null;
        climber.modifiedAt = climber.modifiedAt != null ? moment(climber.modifiedAt) : null;
        climber.deletedAt = climber.deletedAt != null ? moment(climber.deletedAt) : null;
      });
    }
    return res;
  }
}
