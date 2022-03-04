import { PickSearcher } from "../PickSearcher";

describe("PickSearcher", () => {
  let searcher: PickSearcher;

  const NUM = -100;

  beforeEach(() => {
    searcher = new PickSearcher(() => NUM);
  });

  it("should return empty for empty input", () => {
    expect(searcher.matchIndices([])).toStrictEqual([]);
  });

  it("should return 0 for a one-element array", () => {
    expect(searcher.matchIndices([NUM])).toStrictEqual([0]);
  });

  it("should return the picked index", () => {
    expect(searcher.matchIndices([5, NUM])).toStrictEqual([1]);
  });
  it("should return the index with many numbers", () => {
    expect(searcher.matchIndices([5, 3, 10, NUM, 2])).toStrictEqual([3]);
  });

  it("should return all indices that match", () => {
    expect(searcher.matchIndices([5, NUM, 10, NUM, 4, NUM])).toStrictEqual([
      1, 3, 5,
    ]);
  });

  it("should return empty if a non-matching number is picked", () => {
    expect(searcher.matchIndices([5, 3, 9])).toStrictEqual([]);
  });

  it("should return empty if there is only one, non-matching number", () => {
    expect(searcher.matchIndices([1])).toStrictEqual([]);
  });

  // This one is slightly awkward, but basically, if the pick callback does
  // nothing useful, we should end up with anything matching the first value
  it("should default to the first value", () => {
    searcher = new PickSearcher((acc) => acc);
    expect(searcher.matchIndices([3, 5, 9])).toStrictEqual([0]);
    expect(searcher.matchIndices([3, 5, 9, 3])).toStrictEqual([0, 3]);
  });
});
