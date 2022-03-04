import { PickSearcher } from "../PickSearcher";
import { TwoDimensionMatcher } from "../TwoDimensionMatcher";

describe("TwoDimensionMatcher", () => {
  const NUM = -100;
  const searcher = new PickSearcher(() => NUM);
  const doubleSearcher = new PickSearcher(() => NUM * 2);
  const lastSearcher = new PickSearcher((_, num) => num);

  let theMatcher: TwoDimensionMatcher;

  beforeEach(() => {
    theMatcher = new TwoDimensionMatcher(searcher, searcher);
  });

  it("should return an empty array with empty input", () => {
    expect(theMatcher.matchCoordinates([])).toHaveLength(0);
  });

  it("should throw on mismatched row lengths", () => {
    expect(() => theMatcher.matchCoordinates([[1, 2], [1]])).toThrow();
  });

  it("should return the coordinates for a single matching value", () => {
    expect(theMatcher.matchCoordinates([[NUM]])).toStrictEqual([
      { x: 0, y: 0 },
    ]);
  });

  it("should return empty for no picked values", () => {
    expect(theMatcher.matchCoordinates([[100]])).toHaveLength(0);
  });

  it("should find one match out of many values", () => {
    expect(
      theMatcher.matchCoordinates([
        [0, 0, 0],
        [1, 1, NUM],
        [2, 2, 2],
      ])
    ).toStrictEqual([{ x: 2, y: 1 }]);
  });

  it("should not find values when only one searcher matches", () => {
    theMatcher = new TwoDimensionMatcher(searcher, doubleSearcher);
    expect(
      theMatcher.matchCoordinates([
        [0, 0, 0],
        [1, 1, NUM],
        [NUM, 2, 2],
      ])
    ).toStrictEqual([]);
  });

  it("should only find values where both searchers match", () => {
    theMatcher = new TwoDimensionMatcher(searcher, lastSearcher);

    // 'lastSearcher' will always match the number from the bottom row because
    // it's searching each column, so it'll only match 2,2
    expect(
      theMatcher.matchCoordinates([
        [NUM, 1, 2],
        [3, NUM, 4],
        [5, 6, NUM],
      ])
    ).toStrictEqual([{ x: 2, y: 2 }]);
  });

  it("should find all shared matches", () => {
    expect(
      theMatcher.matchCoordinates([
        [1, NUM, 2],
        [3, NUM, 4],
        [5, 6, NUM],
      ])
    ).toStrictEqual([
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 2 },
    ]);
  });
});
