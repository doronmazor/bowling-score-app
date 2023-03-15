import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, withLatestFrom } from 'rxjs/operators';

import { IState } from '../reducers';
import * as actions from '../actions';
import * as fromGame from '../selectors';

@Injectable()
export class GameEffects {
  public navigate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.updatePlayerFrame),
        withLatestFrom(this.store.select(fromGame.selectPlayers)),
        withLatestFrom(this.store.select(fromGame.selectGameCurrentPlayerId)),
        withLatestFrom(this.store.select(fromGame.selectGameRound)),
        switchMap(([[[, players], currentPlayerId], round]) => {
          const returnActions = [];

          const currentPlayerIndex = players.findIndex(p => p.id === currentPlayerId);
          if (currentPlayerIndex + 1 === players.length) {
            if (round === 9) {
              returnActions.push(actions.finishGame());
            } else {
              returnActions.push(actions.increaseRound());
              returnActions.push(actions.selectCurrentPlayer({playerId: players[0].id}));
            }
          } else {
            returnActions.push(actions.selectCurrentPlayer({playerId: players[currentPlayerIndex + 1].id}));
          }

          return returnActions;
        })
      )
  );

  constructor(
    private actions$: Actions,
    private store: Store<IState>,
  ) {}
}
