import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';

import { IFrame, IPlayer } from '../interfaces';
import * as actions from '../actions';
import { isSpare, isStrike, isStrikeOrSpare } from '../utils';

export interface State extends EntityState<IPlayer> {
  // additional entities state properties
}

function selectFrameId(a: IPlayer): string {
  return a.id;
}

const adapter: EntityAdapter<IPlayer> = createEntityAdapter<IPlayer>({
  selectId: selectFrameId
});

const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

const playerTwoReducer = createReducer(
  initialState,
  on(actions.addPlayer, (state, { player }) => {
    return adapter.upsertOne(player, state);
  }),
  on(actions.updatePlayerFrame, (state, { playerId, frame }) => {
    const player = {...state.entities[playerId]};
    const frames = [...player?.frames];
    frames[frame.index] = frame;
    player.frames = frames;
    const updatedPlayer = updateSpareOrStrikeIfNeeded(JSON.parse(JSON.stringify(player)), frame.index);
    return adapter.upsertOne(updatedPlayer, state);
  }),
  on(actions.newGame, (state) => {
    return adapter.removeAll(state);
  }),
);

export function reducer(state: State | undefined, action: Action) {
  return playerTwoReducer(state, action);
}

function updateSpareOrStrikeIfNeeded(player: IPlayer, currentFrameIndex: number): IPlayer {
  const currentFrame = player.frames[currentFrameIndex];

  if (currentFrameIndex < 1) {
    if (!isStrikeOrSpare(currentFrame)) {
      currentFrame.score = player.totalScore + getFrameScore(currentFrame);
      player.totalScore = currentFrame.score;
    }
    return player;
  }

  if (hasPreviousSpareOrStrike(player.frames, currentFrameIndex)) {
    const previousFrame = player.frames[currentFrameIndex - 1];
    if (currentFrameIndex > 1) {
      const previousTwoFrame = player.frames[currentFrameIndex - 2];
      // checking if 2 strikes in a row need to update previous two frame
      if (isStrike(previousTwoFrame) && isStrike(previousFrame)) {
        previousTwoFrame.score = player.totalScore + 10 + 10 + getRollOneFrameScore(currentFrame);
        player.totalScore = previousTwoFrame.score;
      }
    }

    // updating strike score if previous frame is strike and current frame is not strike
    if (isStrike(previousFrame) && (!isStrike(currentFrame) || currentFrameIndex === 9)) {
      previousFrame.score = player.totalScore + 10 + getFrameScore(currentFrame);
      player.totalScore = previousFrame.score;
      updateFrameScoreIfNeeded(player, currentFrameIndex);

    // Updating spare score
    } else if (isSpare(previousFrame)) {
      previousFrame.score = player.totalScore + 10 + getRollOneFrameScore(currentFrame);
      player.totalScore = previousFrame.score;
      updateFrameScoreIfNeeded(player, currentFrameIndex);
    }
  } else {
    updateFrameScoreIfNeeded(player, currentFrameIndex);
  }

  return player;
}

function updateFrameScoreIfNeeded(player: IPlayer, currentFrameIndex: number) {
  const currentFrame = player.frames[currentFrameIndex];
  if (currentFrameIndex === 9 && currentFrame.score === undefined) {
    if (isStrike(currentFrame)) {
      currentFrame.score = player.totalScore + 10 + (currentFrame.rollTwo ?? 0) + (currentFrame.rollThird ?? 0);
    } else if (isSpare(currentFrame)) {
      currentFrame.score = player.totalScore + 10 + (currentFrame.rollThird ?? 0);
    } else {
      currentFrame.score = player.totalScore + getFrameScore(currentFrame) + (currentFrame.rollThird ?? 0);
    }

    player.totalScore = currentFrame.score;
  } else if (!isStrikeOrSpare(currentFrame) && currentFrame.score === undefined) {
    currentFrame.score = player.totalScore + getFrameScore(currentFrame);
    player.totalScore = currentFrame.score;
  }
}

function hasPreviousSpareOrStrike(frames: IFrame[], currentFrameIndex: number) {
  if (currentFrameIndex < 1) {
    return false;
  }

  // checking if spare or strike in previous frame
  const previousFrame = frames[currentFrameIndex - 1];
  if (isSpare(previousFrame) || isStrike(previousFrame)) {
    return true;
  }

  // checking if strike in previous two frame
  if (currentFrameIndex > 1) {
    const previousTwoFrame = frames[currentFrameIndex - 2];
    if (isStrike(previousTwoFrame)) {
      return true;
    }
  }

  return false;
}

function getFrameScore(frame: IFrame): number {
  return frame.rollOne + (frame.rollTwo ?? 0);
}

function getRollOneFrameScore(frame: IFrame): number {
  return frame.rollOne;
}
