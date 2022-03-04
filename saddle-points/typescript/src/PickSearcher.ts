import { Searcher } from "./Searcher";

export class PickSearcher implements Searcher {
  // pick chooses which number to look for. It must always pick something,
  // though it could return a value not in the array, resulting in an empty
  // result list.
  // The first call will pass the first input value as both arguments, that is,
  // it will have acc = num = search[0] (where search is the array to search)
  constructor(private readonly pick: (acc: number, num: number) => number) {}

  matchIndices(search: number[]): number[] {
    if (search.length == 0) return [];

    const min = search.reduce(this.pick, search[0]);
    const indices = search.reduce((acc, num, idx) => {
      if (num == min) acc.push(idx);
      return acc;
    }, [] as number[]);
    return indices;
  }
}
