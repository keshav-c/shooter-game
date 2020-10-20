import { getRank } from '../score/leaderBoardUtil';
import unsortedData from '../score/__mocks__/testDataUnsorted';
import sortedScores from '../score/__mocks__/testDataSorted';

it('getRank fails to get rank from the unsorted data', () => {
  expect(getRank('bra', 30, unsortedData)).not.toBe(2);
});

it('getRank gets the correct rank from the sorted data', () => {
  expect(getRank('bra', 30, sortedScores)).toBe(2);
});
