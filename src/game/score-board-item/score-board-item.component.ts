import { Component, Input, OnInit } from '@angular/core';
import { isSpare, isStrike } from '../../game-data/core/utils';
import { IFrame } from '../../game-data/core/interfaces';

@Component({
  selector: 'app-score-board-item',
  templateUrl: './score-board-item.component.html',
  styleUrls: ['./score-board-item.component.scss']
})
export class ScoreBoardItemComponent implements OnInit {

  @Input() frame: IFrame;

  constructor() { }

  public ngOnInit(): void {
  }

  public isStrike() {
    return isStrike(this.frame);
  }

  public isSpare() {
    return isSpare(this.frame);
  }

  public isStrikeOrSpare() {
    return this.isSpare() || this.isStrike();
  }

  public rollOneText() {
    return this.isStrike() ? 'X' : this.frame.rollOne;
  }

  public rollTwoText() {
    return this.frame.rollTwo === 10 && this.frame.rollThird ? 'X' : this.isSpare() ? '/' : this.frame.rollTwo;
  }

  public rollThirdText() {
    return this.frame.rollThird === 10 ? 'X' : this.frame.rollThird;
  }
}
