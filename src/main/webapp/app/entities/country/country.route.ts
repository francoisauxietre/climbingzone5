import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Country } from 'app/shared/model/country.model';
import { CountryService } from './country.service';
import { CountryComponent } from './country.component';
import { CountryDetailComponent } from './country-detail.component';
import { CountryUpdateComponent } from './country-update.component';
import { CountryDeletePopupComponent } from './country-delete-dialog.component';
import { ICountry } from 'app/shared/model/country.model';

@Injectable({ providedIn: 'root' })
export class CountryResolve implements Resolve<ICountry> {
  constructor(private service: CountryService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICountry> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Country>) => response.ok),
        map((country: HttpResponse<Country>) => country.body)
      );
    }
    return of(new Country());
  }
}

export const countryRoute: Routes = [
  {
    path: '',
    component: CountryComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'climbingzone5App.country.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CountryDetailComponent,
    resolve: {
      country: CountryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'climbingzone5App.country.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CountryUpdateComponent,
    resolve: {
      country: CountryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'climbingzone5App.country.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CountryUpdateComponent,
    resolve: {
      country: CountryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'climbingzone5App.country.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const countryPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CountryDeletePopupComponent,
    resolve: {
      country: CountryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'climbingzone5App.country.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
