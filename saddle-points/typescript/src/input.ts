import { EventEmitter } from "events";
import { findSaddlePoints } from "./saddle-points";

export function parseArrayRow(inputLine: string): number[] {
  const inputs = inputLine.split(" ").filter((str) => str.length != 0);
  return inputs.map((i) => parseInt(i));
}

export function processInputRow(
  inputRow: string,
  expectedCount: number
): number[] {
  const numbers = parseArrayRow(inputRow);
  if (numbers.length != expectedCount)
    throw new Error(`Expected ${expectedCount} numbers per row`);
  return numbers;
}

/// Wraps up the boundary of our program so that it's easier to test.
export interface IOBoundary {
  /// Must emit a "line" event whenever a new input line comes in
  lineEmitter: EventEmitter;
  /// Exits the program with a given code
  exit(code: number): void;
  /// Prints an output line.
  /// "out" will not contain a newline, so one should be added if needed.
  output(out: string): void;
}

// This is roughly equivalent to a main function loop in your standard C
// program. It reads 5 lines, then triggers an exit.
export function processIO(io: IOBoundary, dimension: number) {
  const rows: number[][] = [];
  io.lineEmitter.on("line", (inputLine) => {
    try {
      rows.push(processInputRow(inputLine, dimension));
    } catch (e) {
      const err = e as Error;
      io.output(err.message);
      io.exit(1);
    }

    if (rows.length === dimension) {
      const points = findSaddlePoints(rows);

      if (points.length === 0) {
        io.output("No saddle points");
      } else {
        points.forEach((p) => {
          io.output(`(${p.x}, ${p.y})`);
        });
      }
      io.exit(0);
    }
  });
}
