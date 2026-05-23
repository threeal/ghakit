import { EOL } from "node:os";
import {
  type MockInstance,
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from "vitest";

import {
  beginLogGroup,
  endLogGroup,
  logCommand,
  logDebug,
  logError,
  logInfo,
  logWarning,
} from "./log.js";

let writeSpy: MockInstance;

beforeEach(() => {
  writeSpy = vi.spyOn(process.stdout, "write").mockReturnValue(true);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("logInfo", () => {
  test("writes message to stdout", () => {
    logInfo("an information message");
    expect(writeSpy).toHaveBeenCalledWith(`an information message${EOL}`);
  });
});

describe("logDebug", () => {
  test("writes debug command to stdout", () => {
    logDebug("a debug message");
    expect(writeSpy).toHaveBeenCalledWith(`::debug::a debug message${EOL}`);
  });
});

describe("logWarning", () => {
  test("writes warning command to stdout", () => {
    logWarning("a warning message");
    expect(writeSpy).toHaveBeenCalledWith(`::warning::a warning message${EOL}`);
  });
});

describe("logError", () => {
  test("writes error command for a string", () => {
    logError("an error message");
    expect(writeSpy).toHaveBeenCalledWith(`::error::an error message${EOL}`);
  });

  test("writes error command for an Error object", () => {
    logError(new Error("an error object"));
    expect(writeSpy).toHaveBeenCalledWith(`::error::an error object${EOL}`);
  });
});

describe("logCommand", () => {
  test("writes command with arguments to stdout", () => {
    logCommand("cmd", "arg0", "arg1", "arg2");
    expect(writeSpy).toHaveBeenCalledWith(`[command]cmd arg0 arg1 arg2${EOL}`);
  });
});

describe("beginLogGroup", () => {
  test("writes group command to stdout", () => {
    beginLogGroup("a log group");
    expect(writeSpy).toHaveBeenCalledWith(`::group::a log group${EOL}`);
  });
});

describe("endLogGroup", () => {
  test("writes endgroup command to stdout", () => {
    endLogGroup();
    expect(writeSpy).toHaveBeenCalledWith(`::endgroup::${EOL}`);
  });
});
