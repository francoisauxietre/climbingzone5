import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IClimber } from 'app/shared/model/climber.model';
import { ClimberService } from './climber.service';

@Component({
  selector: 'jhi-climber-delete-dialog',
  templateUrl: './climber-delete-dialog.component.html'
})
export class ClimberDeleteDialogComponent {
  climber: IClimber;

  constructor(protected climberService: ClimberService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.climberService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'climberListModification',
        content: 'Deleted an climber'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-climber-delete-popup',
  template: ''
})
export class ClimberDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ climber }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ClimberDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.climber = climber;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/climber', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/climber', { outlets: { popup: null } }]);
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
