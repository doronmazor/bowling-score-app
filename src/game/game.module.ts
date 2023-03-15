import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { ScoreBoardContainerComponent } from './score-board-container/score-board-container.component';
import { GameDataModule } from '../game-data/game-data.module';
import { ScoreBoardItemComponent } from './score-board-item/score-board-item.component';
import { PlayerScoreBoardComponent } from './player-score-board/player-score-board.component';
import { UpdatePlayerScoreComponent } from './update-player-score/update-player-score.component';
import { FormsModule } from '@angular/forms';
import { AddPlayerComponent } from './add-player/add-player.component';
import { GameContainerComponent } from './game-container/game-container.component';


@NgModule({
  declarations: [
    ScoreBoardContainerComponent,
    ScoreBoardItemComponent,
    PlayerScoreBoardComponent,
    UpdatePlayerScoreComponent,
    AddPlayerComponent,
    GameContainerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    GameRoutingModule,
    GameDataModule
  ]
})
export class GameModule { }
