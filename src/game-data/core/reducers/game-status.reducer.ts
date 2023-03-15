import { createReducer, Action, on } from '@ngrx/store';

import * as actions from '../actions/game-status.actions';

export interface State {
  round: number;
  currentPlayerId: string;
  gameStarted: boolean;
  gameFinished: boolean;
}

const initialState: State = {
  round: 0,
  currentPlayerId: "1",
  gameStarted: false,
  gameFinished: false
};

const gameStateReducer = createReducer(
  initialState,
  on(actions.increaseRound, (state) => {
    return {
      ...state,
      round: state.round + 1
    };
  }),
  on(actions.selectCurrentPlayer, (state, { playerId }) => {
    return {
      ...state,
      currentPlayerId: playerId
    };
  }),
  on(actions.startGame, (state) => {
    return {
      ...state,
      gameStarted: true
    };
  }),
  on(actions.finishGame, (state) => {
    return {
      ...state,
      gameFinished: true
    };
  }),
  on(actions.newGame, (state) => {
    return {
      ...state,
      round: 0,
      currentPlayerId: "1",
      gameStarted: false,
      gameFinished: false
    }
  }),
);

export function reducer(state: State | undefined, action: Action) {
  return gameStateReducer(state, action);
}
