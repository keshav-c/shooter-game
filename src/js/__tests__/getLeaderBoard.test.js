import getLeaderBoard from '../getLeaderBoard';
import fakeLeaderBoard from '../score/__mocks__/testDataSortedAndRanked';

jest.mock('../score/getScores');
jest.mock('../score/postScore');


it('gets the sorted leader board', () => {
  expect.assertions(1);
  return getLeaderBoard('abc', 123)
    .then(data => expect(data).toEqual(fakeLeaderBoard));
});

it('doesn\'t accept games with 0 score', () => {
  expect.assertions(1);
  return getLeaderBoard('abc', 0)
    .catch(reason => expect(reason).toEqual(new Error('invalid score')));
});
