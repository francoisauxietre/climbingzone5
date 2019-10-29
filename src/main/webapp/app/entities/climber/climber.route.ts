import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Climber } from 'app/shared/model/climber.model';
import { ClimberService } from './climber.service';
import { ClimberComponent } from './climber.component';
import { ClimberDetailComponent } from './climber-detail.component';
import { ClimberUpdateComponent } from './climber-update.component';
import { ClimberDeletePopupComponent } from './climber-delete-dialog.component';
import { IClimber } from 'app/shared/model/climber.model';

@Injectable({ providedIn: 'root' })
export class ClimberResolve implements Resolve<IClimber> {
  constructor(private service: ClimberService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IClimber> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Climber>) => response.ok),
        map((climber: HttpResponse<Climber>) => climber.body)
      );
    }
    return of(new Climber());
  }
}

export const climberRoute: Routes = [
  {
    path: '',
    component: ClimberComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'climbingzone5App.climber.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ClimberDetailComponent,
    resolve: {
      climber: ClimberResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'climbingzone5App.climber.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ClimberUpdateComponent,
    resolve: {
      climber: ClimberResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'climbingzone5App.climber.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ClimberUpdateComponent,
    resolve: {
      climber: ClimberResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'climbingzone5App.climber.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const climberPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ClimberDeletePopupComponent,
    resolve: {
      climber: ClimberResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'climbingzone5App.climber.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
