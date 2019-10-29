import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Climbingzone5SharedModule } from 'app/shared/shared.module';
import { ClimbingRouteComponent } from './climbing-route.component';
import { ClimbingRouteDetailComponent } from './climbing-route-detail.component';
import { ClimbingRouteUpdateComponent } from './climbing-route-update.component';
import { ClimbingRouteDeletePopupComponent, ClimbingRouteDeleteDialogComponent } from './climbing-route-delete-dialog.component';
import { climbingRouteRoute, climbingRoutePopupRoute } from './climbing-route.route';

const ENTITY_STATES = [...climbingRouteRoute, ...climbingRoutePopupRoute];

@NgModule({
  imports: [Climbingzone5SharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ClimbingRouteComponent,
    ClimbingRouteDetailComponent,
    ClimbingRouteUpdateComponent,
    ClimbingRouteDeleteDialogComponent,
    ClimbingRouteDeletePopupComponent
  ],
  entryComponents: [ClimbingRouteDeleteDialogComponent]
})
export class Climbingzone5ClimbingRouteModule {}
