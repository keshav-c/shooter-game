const postScore = async (name, score) => new Promise((resolve, reject) => {
  if (score === 0) {
    reject(new Error('invalid score'));
  } else {
    resolve();
  }
});

export default postScore;
