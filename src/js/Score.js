const postScore = async (name, score, resolve, reject) => {
  try {
    const baseURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';
    const gameID = 'Qa2XUOTtOtFp4SJONyU5';
    const gameScore = { user: name, score };
    const postResponse = await fetch(
      `${baseURL}/games/${gameID}/scores/`,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameScore),
      },
    );
    const statusType = Math.floor(postResponse.status / 100);
    if (statusType === 4 || statusType === 5) {
      const data = await postResponse.json();
      throw new Error(`${data.message}`);
    } else {
      const response = await fetch(`${baseURL}/games/${gameID}/scores/`);
      const data = await response.json();
      const allScores = await data.result;
      const sortedScores = allScores.sort((score1, score2) => {
        const num1 = Number(score1.score);
        const num2 = Number(score2.score);
        return num2 - num1;
      });
      const rank = sortedScores.findIndex(
        (position) => position.user === name && position.score === score,
      );
      const top = sortedScores.slice(0, 5);
      top.forEach((game, index) => {
        game.rank = index + 1;
      });
      if (rank >= 5) {
        gameScore.rank = rank;
        top.push(gameScore);
      }
      const leaderboard = { rank, top };
      resolve(leaderboard);
      return;
    }
  } catch (error) {
    reject(error);
  }
};

export default postScore;
