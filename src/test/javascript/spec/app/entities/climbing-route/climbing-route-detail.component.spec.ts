import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Climbingzone5TestModule } from '../../../test.module';
import { ClimbingRouteDetailComponent } from 'app/entities/climbing-route/climbing-route-detail.component';
import { ClimbingRoute } from 'app/shared/model/climbing-route.model';

describe('Component Tests', () => {
  describe('ClimbingRoute Management Detail Component', () => {
    let comp: ClimbingRouteDetailComponent;
    let fixture: ComponentFixture<ClimbingRouteDetailComponent>;
    const route = ({ data: of({ climbingRoute: new ClimbingRoute(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Climbingzone5TestModule],
        declarations: [ClimbingRouteDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ClimbingRouteDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ClimbingRouteDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.climbingRoute).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
