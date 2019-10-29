import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'climber',
        loadChildren: () => import('./climber/climber.module').then(m => m.Climbingzone5ClimberModule)
      },
      {
        path: 'climbing-route',
        loadChildren: () => import('./climbing-route/climbing-route.module').then(m => m.Climbingzone5ClimbingRouteModule)
      },
      {
        path: 'country',
        loadChildren: () => import('./country/country.module').then(m => m.Climbingzone5CountryModule)
      },
      {
        path: 'place',
        loadChildren: () => import('./place/place.module').then(m => m.Climbingzone5PlaceModule)
      },
      {
        path: 'card',
        loadChildren: () => import('./card/card.module').then(m => m.Climbingzone5CardModule)
      },
      {
        path: 'parking',
        loadChildren: () => import('./parking/parking.module').then(m => m.Climbingzone5ParkingModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class Climbingzone5EntityModule {}
