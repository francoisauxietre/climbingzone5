import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Climbingzone5TestModule } from '../../../test.module';
import { ClimberDetailComponent } from 'app/entities/climber/climber-detail.component';
import { Climber } from 'app/shared/model/climber.model';

describe('Component Tests', () => {
  describe('Climber Management Detail Component', () => {
    let comp: ClimberDetailComponent;
    let fixture: ComponentFixture<ClimberDetailComponent>;
    const route = ({ data: of({ climber: new Climber(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Climbingzone5TestModule],
        declarations: [ClimberDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ClimberDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ClimberDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.climber).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
