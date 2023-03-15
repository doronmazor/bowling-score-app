import { Component, Input, OnInit } from '@angular/core';
import { IPlayer } from './../../game-data/core/interfaces';

@Component({
  selector: 'app-player-score-board',
  templateUrl: './player-score-board.component.html',
  styleUrls: ['./player-score-board.component.scss']
})
export class PlayerScoreBoardComponent implements OnInit {
  @Input() player: IPlayer;

  constructor() { }

  public ngOnInit(): void {
  }
}
