const sortScores = (scores) => scores.sort((score1, score2) => {
  const num1 = Number(score1.score);
  const num2 = Number(score2.score);
  return num2 - num1;
});

const getRank = (name,
  score,
  scores) => scores.findIndex((game) => game.user === name && game.score === score) + 1;


const getTop = (scores) => {
  const top = scores.slice(0, 5).map((game, index) => {
    game.rank = index + 1;
    return game;
  });
  return top;
};

export { sortScores, getRank, getTop };