import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IPlayer } from './../../game-data/core/interfaces';
import { GameStoreService } from '../../game-data/core/services/game-store.service';

@Component({
  selector: 'app-score-board-container',
  templateUrl: './score-board-container.component.html',
  styleUrls: ['./score-board-container.component.scss']
})
export class ScoreBoardContainerComponent implements OnInit, OnDestroy {
  public players$: Observable<IPlayer[]>;
  public rounds: number[];

  private destroy$ = new Subject<void>();

  constructor(private gameStore: GameStoreService) { }

  public ngOnInit(): void {
    this.players$ = this.gameStore.players$.pipe(takeUntil(this.destroy$));
    this.rounds = Array(10).map((x,i) => i + 1);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
