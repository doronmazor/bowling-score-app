import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './core/reducers';
import { GameStoreService } from './core/services/game-store.service';
import { GameEffects } from './core/effects/game.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('game', reducers),
    EffectsModule.forFeature([
      GameEffects
    ])
  ],
  providers: [
    GameStoreService
  ]
})
export class GameDataModule { }
