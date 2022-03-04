import { swap2dArrayIndexing } from "../array-swap";

describe("array swap", () => {
  it("should handle empty input", () => {
    expect(swap2dArrayIndexing([])).toStrictEqual([]);
  });

  it("should leave a single item as-is", () => {
    expect(swap2dArrayIndexing([[1]])).toStrictEqual([[1]]);
  });

  it("should swap a single row", () => {
    expect(swap2dArrayIndexing([[1, 2]])).toStrictEqual([[1], [2]]);
  });

  it("should swap multiple rows", () => {
    expect(
      swap2dArrayIndexing([
        [1, 2],
        [3, 4],
      ])
    ).toStrictEqual([
      [1, 3],
      [2, 4],
    ]);
  });

  it("should throw for uneven rows", () => {
    expect(() => swap2dArrayIndexing([[1], [2, 3, 4], [5, 6]])).toThrow();
  });

  it("should handle larger array", () => {
    expect(
      swap2dArrayIndexing([
        [0, 1, 0, 1],
        [0, 2, 2, 1],
      ])
    ).toStrictEqual([
      [0, 0],
      [1, 2],
      [0, 2],
      [1, 1],
    ]);
  });
});
