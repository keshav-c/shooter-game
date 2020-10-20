import { sortScores, getRank, getTop } from './leaderBoardUtil';

const createLeaderBoard = (name, score, allScores) => {
  const sortedScores = sortScores(allScores);
  const rank = getRank(name, score, sortedScores);
  const top = getTop(sortedScores);
  if (rank > 5) {
    top.push({ user: name, score, rank });
  }
  return top;
};

export default createLeaderBoard;