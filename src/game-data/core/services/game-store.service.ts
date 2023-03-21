import { IFrame, IPlayer } from './../interfaces';
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { IState } from "../reducers";

import * as fromGame from '../selectors';
import * as actions from '../actions';

@Injectable({
  providedIn: 'root'
})
export class GameStoreService {
  constructor(private readonly store: Store<IState>) {}

  // Game Status

  public get gameRound$(): Observable<number> {
    return this.store.select(fromGame.selectGameRound);
  }

  public get gameCurrentPlayerId$(): Observable<string> {
    return this.store.select(fromGame.selectGameCurrentPlayerId);
  }

  public get isGameStarted$(): Observable<boolean> {
    return this.store.select(fromGame.isGameStarted);
  }

  public get isGameFinished$(): Observable<boolean> {
    return this.store.select(fromGame.isGameFinished);
  }

  public get selectWinnerPlayer$(): Observable<IPlayer> {
    return this.store.select(fromGame.selectWinnerPlayer);
  }

  public get selectWinnerPlayers$(): Observable<IPlayer[]> {
    return this.store.select(fromGame.selectWinnerPlayers);
  }

  public startGame() {
    this.store.dispatch(actions.startGame());
  }

  public newGame() {
    this.store.dispatch(actions.newGame());
  }

  // Players

  public get players$(): Observable<IPlayer[]> {
    return this.store.select(fromGame.selectPlayers);
  }

  public get selectCurrentPlayer$(): Observable<IPlayer> {
    return this.store.select(fromGame.selectCurrentPlayer);
  }

  public addPlayer(player: IPlayer) {
    this.store.dispatch(actions.addPlayer({ player }));
  }

  public updatePlayerFrame(playerId: string, frame: IFrame) {
    this.store.dispatch(actions.updatePlayerFrame({ playerId, frame }));
  }
}
