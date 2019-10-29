import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { Climbingzone5TestModule } from '../../../test.module';
import { ClimberUpdateComponent } from 'app/entities/climber/climber-update.component';
import { ClimberService } from 'app/entities/climber/climber.service';
import { Climber } from 'app/shared/model/climber.model';

describe('Component Tests', () => {
  describe('Climber Management Update Component', () => {
    let comp: ClimberUpdateComponent;
    let fixture: ComponentFixture<ClimberUpdateComponent>;
    let service: ClimberService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Climbingzone5TestModule],
        declarations: [ClimberUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ClimberUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ClimberUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ClimberService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Climber(123);
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
        const entity = new Climber();
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
