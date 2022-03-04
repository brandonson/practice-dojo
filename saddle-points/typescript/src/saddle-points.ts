import { PickSearcher } from "./PickSearcher";
import { TwoDimensionMatch, TwoDimensionMatcher } from "./TwoDimensionMatcher";

export function findSaddlePoints(input: number[][]): TwoDimensionMatch[] {
  if (input.length == 0) return [];

  const minSearcher = new PickSearcher((acc, num) => (num < acc ? num : acc));
  const maxSearcher = new PickSearcher((acc, num) => (num > acc ? num : acc));

  const matcher = new TwoDimensionMatcher(maxSearcher, minSearcher);

  return matcher.matchCoordinates(input);
}
