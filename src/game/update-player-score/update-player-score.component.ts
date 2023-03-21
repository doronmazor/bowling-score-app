import { Observable, Subject, takeUntil } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IFrame, IPlayer } from '../../game-data/core/interfaces';
import { GameStoreService } from '../../game-data/core/services/game-store.service';

@Component({
  selector: 'app-update-player-score',
  templateUrl: './update-player-score.component.html',
  styleUrls: ['./update-player-score.component.scss']
})
export class UpdatePlayerScoreComponent implements OnInit, OnDestroy {
  public rollOne: number = 0;
  public rollTwo: number = 0;
  public rollThird: number = 0;

  public selectCurrentPlayer$: Observable<IPlayer>;
  public currentRound;

  private currentPlayerId;
  private destroy$ = new Subject<void>();

  constructor(private gameStore: GameStoreService) { }

  public ngOnInit(): void {
    this.selectCurrentPlayer$ = this.gameStore.selectCurrentPlayer$.pipe(takeUntil(this.destroy$));
    this.gameStore.gameRound$.pipe(takeUntil(this.destroy$)).subscribe(round => {
      this.currentRound = round;
    });

    this.gameStore.gameCurrentPlayerId$.pipe(takeUntil(this.destroy$)).subscribe(currentPlayerId => {
      this.currentPlayerId = currentPlayerId;
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public submitFrame() {
    const frame: IFrame = {
      rollOne: this.rollOne,
      rollTwo: this.rollTwo,
      rollThird: this. rollThird,
      index: this.currentRound
    };
    this.gameStore.updatePlayerFrame(this.currentPlayerId, frame);
    this.resetInput();
  }

  public rollOneValid() {
    return this.rollOne !== null ? (this.rollOne <= 10 && this.rollOne >= 0) : false;
  }

  public rollTwoValid() {
    return this.rollTwo !== null ? ((this.rollTwo + this.rollOne ?? 0) <= 10 && this.rollTwo >= 0) : this.rollOneValid() && this.rollOne === 10;
  }

  public isValid() {
    if (this.maxRounds()) {
      return false;
    }
    return this.currentRound === 9 ? this.tenthRoundValidation() : this.rollOneValid() && this.rollTwoValid();
  }

  public shouldAddRollThird() {
    return this.currentRound === 9 && (this.rollOne === 10 || this.rollOne + this.rollTwo === 10);
  }

  public onRollOneUpdate(event) {
    this.rollTwo = 0;
  }

  public rollTwoMax() {
    return this.currentRound === 9 && this.rollOne === 10 ? 10 : 10 - this.rollOne;
  }

  public disableRollTwo() {
    return this.currentRound === 9 && this.rollOne === 10 ? false : this.rollOne === 10;
  }

  private tenthRoundValidation() {
    return this.rollOneValid() &&
            this.rollOne === 10 ? (this.rollTwo <= 10 && this.rollTwo >= 0) : this.rollTwoValid() &&
            (this.shouldAddRollThird() ? this.rollThirdValid() : true);
  }

  private rollThirdValid() {
    return this.rollThird <= 10 && this.rollThird >= 0;
  }

  private resetInput() {
    this.rollOne = 0;
    this.rollTwo = 0;
    this.rollThird = 0;
  }

  private maxRounds() {
    return this.currentRound > 9;
  }
}
