import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IClimbingRoute } from 'app/shared/model/climbing-route.model';
import { ClimbingRouteService } from './climbing-route.service';

@Component({
  selector: 'jhi-climbing-route-delete-dialog',
  templateUrl: './climbing-route-delete-dialog.component.html'
})
export class ClimbingRouteDeleteDialogComponent {
  climbingRoute: IClimbingRoute;

  constructor(
    protected climbingRouteService: ClimbingRouteService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.climbingRouteService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'climbingRouteListModification',
        content: 'Deleted an climbingRoute'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-climbing-route-delete-popup',
  template: ''
})
export class ClimbingRouteDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ climbingRoute }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ClimbingRouteDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.climbingRoute = climbingRoute;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/climbing-route', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/climbing-route', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
