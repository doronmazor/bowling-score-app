import { Component, OnInit } from '@angular/core';
import { generatePlayer } from '../../game-data/core/utils';
import { GameStoreService } from '../../game-data/core/services/game-store.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss']
})
export class AddPlayerComponent implements OnInit {
  public name: string = '';

  private id = 1;

  constructor(private gameStore: GameStoreService) { }

  public ngOnInit(): void {
  }

  public addPlayer() {
    const player = generatePlayer(this.id.toString(), this.name);
    this.gameStore.addPlayer(player);
    this.id++;
    this.resetName()
  }

  public isValid() {
    return this.name.length && this.id < 9
  }

  public isStartGameValid() {
    return this.id > 1;
  }

  public startGame() {
    this.gameStore.startGame();
  }

  private resetName() {
    this.name = '';
  }
}
