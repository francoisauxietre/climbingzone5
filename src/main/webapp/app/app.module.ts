import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { Climbingzone5SharedModule } from 'app/shared/shared.module';
import { Climbingzone5CoreModule } from 'app/core/core.module';
import { Climbingzone5AppRoutingModule } from './app-routing.module';
import { Climbingzone5HomeModule } from './home/home.module';
import { Climbingzone5EntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    Climbingzone5SharedModule,
    Climbingzone5CoreModule,
    Climbingzone5HomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    Climbingzone5EntityModule,
    Climbingzone5AppRoutingModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [JhiMainComponent]
})
export class Climbingzone5AppModule {}
