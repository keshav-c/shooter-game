import getLeaderBoard from '../getLeaderBoard';
import fakeLeaderBoard from '../score/__mocks__/testDataSorted';

jest.mock('../score/getScores');
jest.mock('../score/postScore');


it('gets the sorted leader board', () => {
  expect.assertions(1);
  return getLeaderBoard('abc', 123)
    .then(data => expect(data).toEqual(fakeLeaderBoard));
});
