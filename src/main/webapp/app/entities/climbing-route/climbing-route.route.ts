import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ClimbingRoute } from 'app/shared/model/climbing-route.model';
import { ClimbingRouteService } from './climbing-route.service';
import { ClimbingRouteComponent } from './climbing-route.component';
import { ClimbingRouteDetailComponent } from './climbing-route-detail.component';
import { ClimbingRouteUpdateComponent } from './climbing-route-update.component';
import { ClimbingRouteDeletePopupComponent } from './climbing-route-delete-dialog.component';
import { IClimbingRoute } from 'app/shared/model/climbing-route.model';

@Injectable({ providedIn: 'root' })
export class ClimbingRouteResolve implements Resolve<IClimbingRoute> {
  constructor(private service: ClimbingRouteService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IClimbingRoute> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ClimbingRoute>) => response.ok),
        map((climbingRoute: HttpResponse<ClimbingRoute>) => climbingRoute.body)
      );
    }
    return of(new ClimbingRoute());
  }
}

export const climbingRouteRoute: Routes = [
  {
    path: '',
    component: ClimbingRouteComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'climbingzone5App.climbingRoute.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ClimbingRouteDetailComponent,
    resolve: {
      climbingRoute: ClimbingRouteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'climbingzone5App.climbingRoute.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ClimbingRouteUpdateComponent,
    resolve: {
      climbingRoute: ClimbingRouteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'climbingzone5App.climbingRoute.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ClimbingRouteUpdateComponent,
    resolve: {
      climbingRoute: ClimbingRouteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'climbingzone5App.climbingRoute.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const climbingRoutePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ClimbingRouteDeletePopupComponent,
    resolve: {
      climbingRoute: ClimbingRouteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'climbingzone5App.climbingRoute.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
