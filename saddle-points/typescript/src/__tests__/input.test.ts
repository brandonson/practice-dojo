import {
  IOBoundary,
  parseArrayRow,
  processInputRow,
  processIO,
} from "../input";
import { EventEmitter } from "events";

describe("input", () => {
  describe("row parsing", () => {
    it("parses empty string", () => {
      expect(parseArrayRow("")).toStrictEqual([]);
    });

    it("parses a single number", () => {
      expect(parseArrayRow("500")).toStrictEqual([500]);
    });

    it("parses negative number", () => {
      expect(parseArrayRow("-1")).toStrictEqual([-1]);
    });

    it("parses multiple numbers", () => {
      expect(parseArrayRow("500 -1 2")).toStrictEqual([500, -1, 2]);
    });
  });

  describe("row processing", () => {
    it("throws on empty input", () => {
      expect(() => processInputRow("", 5)).toThrow();
    });

    it("parses 5 numbers", () => {
      expect(processInputRow("1 2 3 4 5", 5)).toStrictEqual([1, 2, 3, 4, 5]);
    });

    it("throws for more than expected numbers", () => {
      expect(() => processInputRow("1 2 3 4 5 6", 5)).toThrow();
    });

    it("throws for too few numbers", () => {
      expect(() => processInputRow("1 2 3 4 5", 6)).toThrow();
    });
  });

  describe("stream processor", () => {
    let boundary: IOBoundary;
    let emitter: EventEmitter;
    const exitCb = jest.fn();
    const outputCb = jest.fn();
    beforeEach(() => {
      emitter = new EventEmitter();
      boundary = {
        lineEmitter: emitter,
        exit: exitCb,
        output: outputCb,
      };
      jest.resetAllMocks();
      processIO(boundary, 5);
    });

    it("exits if there's an empty line", () => {
      emitter.emit("line", "");
      expect(exitCb).toHaveBeenCalledWith(1);
    });

    it("prints an error for an empty line", () => {
      emitter.emit("line", "");
      expect(outputCb).toHaveBeenCalledWith("Expected 5 numbers per row");
    });

    it("exits after 5 lines", () => {
      emitter.emit("line", "0 0 6 0 0");
      emitter.emit("line", "0 0 6 0 0");
      emitter.emit("line", "4 4 5 4 4");
      emitter.emit("line", "0 0 6 0 0");
      emitter.emit("line", "0 0 6 0 0");
      expect(exitCb).toHaveBeenCalledWith(0);
    });

    it("prints a single saddle point", () => {
      emitter.emit("line", "0 0 6 0 0");
      emitter.emit("line", "0 0 6 0 0");
      emitter.emit("line", "4 4 5 4 4");
      emitter.emit("line", "0 0 6 0 0");
      emitter.emit("line", "0 0 6 0 0");
      expect(outputCb).toHaveBeenCalledWith("(2, 2)");
      expect(outputCb).toHaveBeenCalledTimes(1);
    });

    it("prints for no saddle points", () => {
      emitter.emit("line", "0 0 6 0 0");
      emitter.emit("line", "0 0 6 0 0");
      emitter.emit("line", "4 4 5 4 4");
      emitter.emit("line", "0 0 6 0 0");
      emitter.emit("line", "0 0 4 0 9");
      expect(outputCb).toHaveBeenCalledWith("No saddle points");
      expect(outputCb).toHaveBeenCalledTimes(1);
    });

    it("prints multiple saddle points", () => {
      emitter.emit("line", "0 0 6 0 0");
      emitter.emit("line", "0 0 6 0 0");
      emitter.emit("line", "4 4 5 4 4");
      emitter.emit("line", "0 0 6 0 0");
      emitter.emit("line", "4 4 5 4 4");
      expect(outputCb).toHaveBeenCalledWith("(2, 2)");
      expect(outputCb).toHaveBeenCalledWith("(2, 4)");
      expect(outputCb).toHaveBeenCalledTimes(2);
    });
  });
});
