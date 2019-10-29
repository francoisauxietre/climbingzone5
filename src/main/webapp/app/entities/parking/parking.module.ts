import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Climbingzone5SharedModule } from 'app/shared/shared.module';
import { ParkingComponent } from './parking.component';
import { ParkingDetailComponent } from './parking-detail.component';
import { ParkingUpdateComponent } from './parking-update.component';
import { ParkingDeletePopupComponent, ParkingDeleteDialogComponent } from './parking-delete-dialog.component';
import { parkingRoute, parkingPopupRoute } from './parking.route';

const ENTITY_STATES = [...parkingRoute, ...parkingPopupRoute];

@NgModule({
  imports: [Climbingzone5SharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ParkingComponent,
    ParkingDetailComponent,
    ParkingUpdateComponent,
    ParkingDeleteDialogComponent,
    ParkingDeletePopupComponent
  ],
  entryComponents: [ParkingDeleteDialogComponent]
})
export class Climbingzone5ParkingModule {}
