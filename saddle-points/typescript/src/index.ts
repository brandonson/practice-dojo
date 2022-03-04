import { IOBoundary, processIO } from "./input";
import readline from "readline";

// Problem says 5x5 array, so hardcode to that
// Could take an input arg with a bit of work to accept/parse it
const DIMENSION = 5;

const rl = readline.createInterface({
  input: process.stdin,
});

const io: IOBoundary = {
  lineEmitter: rl,
  exit: (code) => process.exit(code),
  output: (out) => process.stdout.write(`${out}\n`),
};

processIO(io, DIMENSION);
