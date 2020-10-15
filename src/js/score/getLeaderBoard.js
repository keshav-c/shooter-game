import postScore from './postScore';
import getScores from './getScores';
import createLeaderBoard from './createLeaderBoard';

const getLeaderBoard = async (name, score, resolve, reject) => {
  try {
    await postScore(name, score);
    const allScores = await getScores();
    const leaderBoard = createLeaderBoard(name, score, allScores);
    resolve(leaderBoard);
    return;
  } catch (error) {
    reject(error);
  }
};

export default getLeaderBoard;
