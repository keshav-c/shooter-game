import { sortScores } from '../score/leaderBoardUtil';
import unsortedData from '../score/__mocks__/testDataUnsorted';
import sortedScores from '../score/__mocks__/testDataSorted';

it('sortScores sorts games in descending order of scores', () => {
  expect(sortScores(unsortedData)).toEqual(sortedScores);
});