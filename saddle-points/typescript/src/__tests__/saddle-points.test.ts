import { findSaddlePoints } from "../saddle-points";

describe("saddle points finder", () => {
  it("finds nothing in empty input", () => {
    expect(findSaddlePoints([])).toStrictEqual([]);
  });

  it("finds the only value in a single value input", () => {
    expect(findSaddlePoints([[1]])).toStrictEqual([{ x: 0, y: 0 }]);
  });

  it("finds all points in an array with all equal", () => {
    expect(
      findSaddlePoints([
        [1, 1],
        [1, 1],
      ])
    ).toEqual(
      expect.arrayContaining([
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 0, y: 1 },
        { x: 1, y: 0 },
      ])
    );
  });

  it("finds single saddle point", () => {
    expect(
      findSaddlePoints([
        [0, 1],
        [0, 2],
      ])
    ).toStrictEqual([{ x: 1, y: 0 }]);
  });

  it("finds two saddle points", () => {
    expect(
      findSaddlePoints([
        [0, 1, 0, 1],
        [0, 2, 2, 1],
      ])
    ).toEqual(
      expect.arrayContaining([
        { x: 1, y: 0 },
        { x: 3, y: 0 },
      ])
    );
  });
});
