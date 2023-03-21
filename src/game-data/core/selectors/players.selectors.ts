import { selectGameCurrentPlayerId } from './game-status.selectors';
import { createSelector } from '@ngrx/store';

import { selectGameState } from '../reducers';

export const selectPlayersState = createSelector(selectGameState, state => state.players);

export const selectPlayers = createSelector(selectPlayersState, state => Object.values(state.entities));

export const selectCurrentPlayer = createSelector(selectPlayersState, selectGameCurrentPlayerId, (state, currentPlayerId) => state.entities[currentPlayerId]);

export const selectWinnerPlayer = createSelector(selectPlayers, players => {
  return players.sort((p1, p2) => p2.totalScore - p1.totalScore)[0]
});

export const selectWinnerPlayers = createSelector(selectWinnerPlayer, selectPlayers, (winnerPlayer, players) => {
  return players.filter(p => p.totalScore === winnerPlayer.totalScore)
});
