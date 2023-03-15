import { IPlayer, IFrame } from './../interfaces';
import { createAction, props } from '@ngrx/store';

export const addPlayer = createAction('[Players] Add Player', props<{ player: IPlayer }>());
export const updatePlayerFrame = createAction('[Players] Update Player Frame', props<{ playerId: string, frame: IFrame }>());
