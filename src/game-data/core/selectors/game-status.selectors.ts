import { createSelector } from '@ngrx/store';

import { selectGameState } from '../reducers';

export const selectGameStatusState = createSelector(selectGameState, state => state.gameStatus);

export const selectGameRound = createSelector(selectGameStatusState, state => state.round);

export const selectGameCurrentPlayerId = createSelector(selectGameStatusState, state => state.currentPlayerId);

export const isGameStarted = createSelector(selectGameStatusState, state => state.gameStarted);

export const isGameFinished = createSelector(selectGameStatusState, state => state.gameFinished);
