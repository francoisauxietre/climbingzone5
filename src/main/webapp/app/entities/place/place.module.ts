import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Climbingzone5SharedModule } from 'app/shared/shared.module';
import { PlaceComponent } from './place.component';
import { PlaceDetailComponent } from './place-detail.component';
import { PlaceUpdateComponent } from './place-update.component';
import { PlaceDeletePopupComponent, PlaceDeleteDialogComponent } from './place-delete-dialog.component';
import { placeRoute, placePopupRoute } from './place.route';

const ENTITY_STATES = [...placeRoute, ...placePopupRoute];

@NgModule({
  imports: [Climbingzone5SharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [PlaceComponent, PlaceDetailComponent, PlaceUpdateComponent, PlaceDeleteDialogComponent, PlaceDeletePopupComponent],
  entryComponents: [PlaceDeleteDialogComponent]
})
export class Climbingzone5PlaceModule {}
