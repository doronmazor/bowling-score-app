import { createAction, props } from '@ngrx/store';

export const increasePlayerOneFrame = createAction('[GameStatus] Increase Player One Frame');
export const increasePlayerTwoFrame = createAction('[GameStatus] Increase Player Two Frame');
export const increaseRound = createAction('[GameStatus] Increase Round');
export const selectCurrentPlayer = createAction('[GameStatus] Select Player', props<{ playerId: string }>());
export const startGame = createAction('[GameStatus] Start Game');
export const newGame = createAction('[GameStatus] New Game');
export const finishGame = createAction('[GameStatus] Finish Game');
