import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Climbingzone5SharedModule } from 'app/shared/shared.module';
import { CardComponent } from './card.component';
import { CardDetailComponent } from './card-detail.component';
import { CardUpdateComponent } from './card-update.component';
import { CardDeletePopupComponent, CardDeleteDialogComponent } from './card-delete-dialog.component';
import { cardRoute, cardPopupRoute } from './card.route';

const ENTITY_STATES = [...cardRoute, ...cardPopupRoute];

@NgModule({
  imports: [Climbingzone5SharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [CardComponent, CardDetailComponent, CardUpdateComponent, CardDeleteDialogComponent, CardDeletePopupComponent],
  entryComponents: [CardDeleteDialogComponent]
})
export class Climbingzone5CardModule {}
