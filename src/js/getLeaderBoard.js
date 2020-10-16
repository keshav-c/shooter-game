import postScore from './score/postScore';
import getScores from './score/getScores';
import createLeaderBoard from './score/createLeaderBoard';

const getLeaderBoard = async (name, score) => new Promise((resolve, reject) => {
  postScore(name, score)
    .then(() => getScores())
    .then((allScores) => createLeaderBoard(name, score, allScores))
    .then((leaderBoard) => resolve(leaderBoard))
    .catch((reason) => reject(reason));
});

export default getLeaderBoard;
