import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IClimbingRoute } from 'app/shared/model/climbing-route.model';

type EntityResponseType = HttpResponse<IClimbingRoute>;
type EntityArrayResponseType = HttpResponse<IClimbingRoute[]>;

@Injectable({ providedIn: 'root' })
export class ClimbingRouteService {
  public resourceUrl = SERVER_API_URL + 'api/climbing-routes';

  constructor(protected http: HttpClient) {}

  create(climbingRoute: IClimbingRoute): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(climbingRoute);
    return this.http
      .post<IClimbingRoute>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(climbingRoute: IClimbingRoute): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(climbingRoute);
    return this.http
      .put<IClimbingRoute>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IClimbingRoute>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IClimbingRoute[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(climbingRoute: IClimbingRoute): IClimbingRoute {
    const copy: IClimbingRoute = Object.assign({}, climbingRoute, {
      createdAt: climbingRoute.createdAt != null && climbingRoute.createdAt.isValid() ? climbingRoute.createdAt.toJSON() : null,
      modifiedAt: climbingRoute.modifiedAt != null && climbingRoute.modifiedAt.isValid() ? climbingRoute.modifiedAt.toJSON() : null,
      deletedAt: climbingRoute.deletedAt != null && climbingRoute.deletedAt.isValid() ? climbingRoute.deletedAt.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdAt = res.body.createdAt != null ? moment(res.body.createdAt) : null;
      res.body.modifiedAt = res.body.modifiedAt != null ? moment(res.body.modifiedAt) : null;
      res.body.deletedAt = res.body.deletedAt != null ? moment(res.body.deletedAt) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((climbingRoute: IClimbingRoute) => {
        climbingRoute.createdAt = climbingRoute.createdAt != null ? moment(climbingRoute.createdAt) : null;
        climbingRoute.modifiedAt = climbingRoute.modifiedAt != null ? moment(climbingRoute.modifiedAt) : null;
        climbingRoute.deletedAt = climbingRoute.deletedAt != null ? moment(climbingRoute.deletedAt) : null;
      });
    }
    return res;
  }
}
