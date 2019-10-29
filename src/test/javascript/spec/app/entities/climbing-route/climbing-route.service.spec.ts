import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ClimbingRouteService } from 'app/entities/climbing-route/climbing-route.service';
import { IClimbingRoute, ClimbingRoute } from 'app/shared/model/climbing-route.model';
import { RouteType } from 'app/shared/model/enumerations/route-type.model';
import { ZoneType } from 'app/shared/model/enumerations/zone-type.model';

describe('Service Tests', () => {
  describe('ClimbingRoute Service', () => {
    let injector: TestBed;
    let service: ClimbingRouteService;
    let httpMock: HttpTestingController;
    let elemDefault: IClimbingRoute;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(ClimbingRouteService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new ClimbingRoute(
        0,
        'AAAAAAA',
        'AAAAAAA',
        0,
        0,
        'AAAAAAA',
        0,
        0,
        0,
        0,
        0,
        currentDate,
        currentDate,
        currentDate,
        RouteType.BOULDER,
        ZoneType.INTERIOR
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            createdAt: currentDate.format(DATE_TIME_FORMAT),
            modifiedAt: currentDate.format(DATE_TIME_FORMAT),
            deletedAt: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a ClimbingRoute', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            createdAt: currentDate.format(DATE_TIME_FORMAT),
            modifiedAt: currentDate.format(DATE_TIME_FORMAT),
            deletedAt: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            createdAt: currentDate,
            modifiedAt: currentDate,
            deletedAt: currentDate
          },
          returnedFromService
        );
        service
          .create(new ClimbingRoute(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a ClimbingRoute', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            bonus: 'BBBBBB',
            latitude: 1,
            longitude: 1,
            difficuty: 'BBBBBB',
            star: 1,
            physical: 1,
            technical: 1,
            tactical: 1,
            mental: 1,
            createdAt: currentDate.format(DATE_TIME_FORMAT),
            modifiedAt: currentDate.format(DATE_TIME_FORMAT),
            deletedAt: currentDate.format(DATE_TIME_FORMAT),
            routeType: 'BBBBBB',
            zouneType: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            createdAt: currentDate,
            modifiedAt: currentDate,
            deletedAt: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of ClimbingRoute', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            bonus: 'BBBBBB',
            latitude: 1,
            longitude: 1,
            difficuty: 'BBBBBB',
            star: 1,
            physical: 1,
            technical: 1,
            tactical: 1,
            mental: 1,
            createdAt: currentDate.format(DATE_TIME_FORMAT),
            modifiedAt: currentDate.format(DATE_TIME_FORMAT),
            deletedAt: currentDate.format(DATE_TIME_FORMAT),
            routeType: 'BBBBBB',
            zouneType: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            createdAt: currentDate,
            modifiedAt: currentDate,
            deletedAt: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a ClimbingRoute', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
