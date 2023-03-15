export interface IGame {
  playerOne: IPlayer;
  playerTwo: IPlayer;
}

export interface IPlayer {
  id: string;
  name: string;
  frames: IFrame[];
  totalScore: number;
}

export interface IFrame {
  index: number;
  rollOne: number;
  rollTwo: number;
  rollThird?: number;
  score?: number;
}
