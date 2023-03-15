import { IFrame, IPlayer } from "./interfaces";

export function generatePlayer(id: string, name?: string): IPlayer {
  return {
    id: id,
    name: name ?? `Player ${id}`,
    frames: generateGameEmptyFrames(),
    totalScore: 0
  };
}

export function generateGameEmptyFrames(): IFrame[] {
  const frames: IFrame[] = [];
  for (let i = 0; i < 10; i++) {
    frames.push({
      index: i,
      rollOne: null,
      rollTwo: null,
      score: null
    });
  }
  return frames;
}

export function isSpare(frame: IFrame) {
  return !isStrike(frame) && frame.rollOne + frame.rollTwo === 10;
}

export function isStrike(frame: IFrame) {
  return frame.rollOne === 10;
}

export function isStrikeOrSpare(frame: IFrame) {
  return isSpare(frame) || isStrike(frame);
}
