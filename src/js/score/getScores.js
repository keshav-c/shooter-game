import db from './apiDetails';

const getScores = async () => {
  const baseURL = db.url;
  const gameID = db.id;
  const response = await fetch(`${baseURL}/games/${gameID}/scores/`);
  const statusType = Math.floor(response.status / 100);
  if (statusType === 4 || statusType === 5) {
    const data = await response.json();
    throw new Error(`${data.message}`);
  }
  const data = await response.json();
  const allScores = await data.result;
  return allScores;
};

export default getScores;