import db from './apiDetails';

const postScore = async (name, score) => {
  const baseURL = db.url;
  const gameID = db.id;
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
  }
};

export default postScore;