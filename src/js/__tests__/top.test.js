import { getTop } from '../score/leaderBoardUtil';
import sortedScores from '../score/__mocks__/testDataSorted';
import rankedScores from '../score/__mocks__/testDataSortedAndRanked';

it('getTop returns the top 5 in the leaderboard with their rank', () => {
  expect(getTop(sortedScores)).toEqual(rankedScores);
});
