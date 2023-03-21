import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IPlayer } from '../../game-data/core/interfaces';
import { GameStoreService } from '../../game-data/core/services/game-store.service';

@Component({
  selector: 'app-game-container',
  templateUrl: './game-container.component.html',
  styleUrls: ['./game-container.component.scss']
})
export class GameContainerComponent implements OnInit, OnDestroy {

  public isGameStarted$: Observable<boolean>;
  public isGameFinished$: Observable<boolean>;
  public selectWinnerPlayer$: Observable<IPlayer>;
  public selectWinnerPlayers$: Observable<IPlayer[]>;

  private destroy$ = new Subject<void>();

  constructor(private gameStore: GameStoreService) { }

  public ngOnInit(): void {
    this.isGameStarted$ = this.gameStore.isGameStarted$.pipe(takeUntil(this.destroy$));
    this.isGameFinished$ = this.gameStore.isGameFinished$.pipe(takeUntil(this.destroy$));
    this.selectWinnerPlayer$ = this.gameStore.selectWinnerPlayer$.pipe(takeUntil(this.destroy$));
    this.selectWinnerPlayers$ = this.gameStore.selectWinnerPlayers$.pipe(takeUntil(this.destroy$));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public newGame() {
    this.gameStore.newGame();
  }
}
