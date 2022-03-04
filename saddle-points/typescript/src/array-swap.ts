/// Changes indexing, such that input[x][y] == output[y][x].
/// In other words, if the input is an array of rows, the output
/// is an array of columns for the same matrix, and vice versa.
export function swap2dArrayIndexing<T>(input: T[][]): T[][] {
  const rowLen = input.length > 0 ? input[0].length : 0;
  if (!input.every((row) => row.length === rowLen))
    throw new Error("Mismatched row lengths, must all be equal");

  const out: T[][] = [];
  input.forEach((row) => {
    row.forEach((v, i) => {
      if (out.length <= i) {
        out.push([]);
      }
      out[i].push(v);
    });
  });
  return out;
}
