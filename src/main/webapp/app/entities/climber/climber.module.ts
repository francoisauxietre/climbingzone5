import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Climbingzone5SharedModule } from 'app/shared/shared.module';
import { ClimberComponent } from './climber.component';
import { ClimberDetailComponent } from './climber-detail.component';
import { ClimberUpdateComponent } from './climber-update.component';
import { ClimberDeletePopupComponent, ClimberDeleteDialogComponent } from './climber-delete-dialog.component';
import { climberRoute, climberPopupRoute } from './climber.route';

const ENTITY_STATES = [...climberRoute, ...climberPopupRoute];

@NgModule({
  imports: [Climbingzone5SharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ClimberComponent,
    ClimberDetailComponent,
    ClimberUpdateComponent,
    ClimberDeleteDialogComponent,
    ClimberDeletePopupComponent
  ],
  entryComponents: [ClimberDeleteDialogComponent]
})
export class Climbingzone5ClimberModule {}
