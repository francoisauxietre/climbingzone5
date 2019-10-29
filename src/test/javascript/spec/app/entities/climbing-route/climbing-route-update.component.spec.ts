import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { Climbingzone5TestModule } from '../../../test.module';
import { ClimbingRouteUpdateComponent } from 'app/entities/climbing-route/climbing-route-update.component';
import { ClimbingRouteService } from 'app/entities/climbing-route/climbing-route.service';
import { ClimbingRoute } from 'app/shared/model/climbing-route.model';

describe('Component Tests', () => {
  describe('ClimbingRoute Management Update Component', () => {
    let comp: ClimbingRouteUpdateComponent;
    let fixture: ComponentFixture<ClimbingRouteUpdateComponent>;
    let service: ClimbingRouteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Climbingzone5TestModule],
        declarations: [ClimbingRouteUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ClimbingRouteUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ClimbingRouteUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ClimbingRouteService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ClimbingRoute(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new ClimbingRoute();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
