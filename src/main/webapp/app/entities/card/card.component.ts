import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { ICard } from 'app/shared/model/card.model';
import { AccountService } from 'app/core/auth/account.service';
import { CardService } from './card.service';

@Component({
  selector: 'jhi-card',
  templateUrl: './card.component.html'
})
export class CardComponent implements OnInit, OnDestroy {
  cards: ICard[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(protected cardService: CardService, protected eventManager: JhiEventManager, protected accountService: AccountService) {}

  loadAll() {
    this.cardService
      .query()
      .pipe(
        filter((res: HttpResponse<ICard[]>) => res.ok),
        map((res: HttpResponse<ICard[]>) => res.body)
      )
      .subscribe((res: ICard[]) => {
        this.cards = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInCards();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICard) {
    return item.id;
  }

  registerChangeInCards() {
    this.eventSubscriber = this.eventManager.subscribe('cardListModification', response => this.loadAll());
  }
}
