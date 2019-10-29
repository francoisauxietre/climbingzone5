import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { Climbingzone5TestModule } from '../../../test.module';
import { ClimberDeleteDialogComponent } from 'app/entities/climber/climber-delete-dialog.component';
import { ClimberService } from 'app/entities/climber/climber.service';

describe('Component Tests', () => {
  describe('Climber Management Delete Component', () => {
    let comp: ClimberDeleteDialogComponent;
    let fixture: ComponentFixture<ClimberDeleteDialogComponent>;
    let service: ClimberService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Climbingzone5TestModule],
        declarations: [ClimberDeleteDialogComponent]
      })
        .overrideTemplate(ClimberDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ClimberDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ClimberService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
