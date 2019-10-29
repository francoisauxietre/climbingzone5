import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { Climbingzone5TestModule } from '../../../test.module';
import { ClimbingRouteDeleteDialogComponent } from 'app/entities/climbing-route/climbing-route-delete-dialog.component';
import { ClimbingRouteService } from 'app/entities/climbing-route/climbing-route.service';

describe('Component Tests', () => {
  describe('ClimbingRoute Management Delete Component', () => {
    let comp: ClimbingRouteDeleteDialogComponent;
    let fixture: ComponentFixture<ClimbingRouteDeleteDialogComponent>;
    let service: ClimbingRouteService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Climbingzone5TestModule],
        declarations: [ClimbingRouteDeleteDialogComponent]
      })
        .overrideTemplate(ClimbingRouteDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ClimbingRouteDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ClimbingRouteService);
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
