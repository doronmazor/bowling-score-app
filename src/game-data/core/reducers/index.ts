import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';

import * as fromGameStatus from './game-status.reducer';
import * as fromPlayers from './players.reducer';

export interface IState {
  gameStatus: fromGameStatus.State;
  players: fromPlayers.State
}

export const reducers: ActionReducerMap<IState> = {
  gameStatus: fromGameStatus.reducer,
  players: fromPlayers.reducer
};

export const selectGameState = createFeatureSelector<IState>('game');
