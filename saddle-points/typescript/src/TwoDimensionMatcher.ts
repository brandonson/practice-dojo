import { swap2dArrayIndexing } from "./array-swap";
import { Searcher } from "./Searcher";

export interface TwoDimensionMatch {
  x: number;
  y: number;
}

function matchesAreEqual(a: TwoDimensionMatch, b: TwoDimensionMatch) {
  return a.x === b.x && a.y === b.y;
}

export class TwoDimensionMatcher {
  constructor(
    private readonly rowSearcher: Searcher,
    private readonly columnSearcher: Searcher
  ) {}

  private oneSearcherMatches(
    input: number[][],
    searcher: Searcher,
    swap: boolean
  ): TwoDimensionMatch[] {
    if (swap) {
      input = swap2dArrayIndexing(input);
    }

    // This is an array, indexed by [y], where the values are the x-coords of
    // the matches.
    const matching2dXArray = input.map((arr) => searcher.matchIndices(arr));

    //Change out to matches...
    let matches: TwoDimensionMatch[] = [];
    matching2dXArray.forEach((xVals, y) =>
      xVals.forEach((x) => {
        matches.push({ x, y });
      })
    );

    if (swap) {
      matches = matches.map((m) => ({ x: m.y, y: m.x }));
    }
    return matches;
  }

  matchCoordinates(rows: number[][]): TwoDimensionMatch[] {
    if (rows.length == 0) return [];

    const rowLen = rows[0].length;
    if (!rows.every((row) => row.length === rowLen))
      throw new Error("Mismatched row lengths, must all be equal");

    const rowMatches = this.oneSearcherMatches(rows, this.rowSearcher, false);
    const colMatches = this.oneSearcherMatches(rows, this.columnSearcher, true);

    const sharedMatches = rowMatches.filter(
      (match) =>
        colMatches.findIndex((colMatch) => matchesAreEqual(match, colMatch)) >=
        0
    );
    return sharedMatches;
  }
}
