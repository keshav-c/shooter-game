const createLeaderBoard = (name, score, allScores) => {
  const sortedScores = allScores.sort((score1, score2) => {
    const num1 = Number(score1.score);
    const num2 = Number(score2.score);
    return num2 - num1;
  });
  const rank = sortedScores.findIndex(
    (game) => game.user === name && game.score === score,
  ) + 1;
  const top = sortedScores.slice(0, 5);
  top.forEach((game, index) => {
    game.rank = index + 1;
  });
  if (rank > 5) {
    const gameScore = { user: name, score, rank };
    top.push(gameScore);
  }
  return top;
};

export default createLeaderBoard;