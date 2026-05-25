import { randomUUID } from "node:crypto";
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
  resumeCommands,
  stopCommands,
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
    expect(writeSpy.mock.calls).toStrictEqual([
      [`an information message${EOL}`],
    ]);
  });
});

describe("logDebug", () => {
  test("writes debug command to stdout", () => {
    logDebug("a debug message");
    expect(writeSpy.mock.calls).toStrictEqual([
      [`::debug::a debug message${EOL}`],
    ]);
  });
});

describe("logWarning", () => {
  test("writes warning command to stdout", () => {
    logWarning("a warning message");
    expect(writeSpy.mock.calls).toStrictEqual([
      [`::warning::a warning message${EOL}`],
    ]);
  });
});

describe("logError", () => {
  test("writes error command for a string", () => {
    logError("an error message");
    expect(writeSpy.mock.calls).toStrictEqual([
      [`::error::an error message${EOL}`],
    ]);
  });

  test("writes error command for an Error object", () => {
    logError(new Error("an error object"));
    expect(writeSpy.mock.calls).toStrictEqual([
      [`::error::an error object${EOL}`],
    ]);
  });
});

describe("logCommand", () => {
  test("writes command with arguments to stdout", () => {
    logCommand("cmd", "arg0", "arg1", "arg2");
    expect(writeSpy.mock.calls).toStrictEqual([
      [`[command]cmd arg0 arg1 arg2${EOL}`],
    ]);
  });
});

describe("beginLogGroup", () => {
  test("writes group command to stdout", () => {
    beginLogGroup("a log group");
    expect(writeSpy.mock.calls).toStrictEqual([[`::group::a log group${EOL}`]]);
  });
});

describe("endLogGroup", () => {
  test("writes endgroup command to stdout", () => {
    endLogGroup();
    expect(writeSpy.mock.calls).toStrictEqual([[`::endgroup::${EOL}`]]);
  });
});

describe("stopCommands", () => {
  test("writes stop-commands command to stdout", () => {
    const endToken = randomUUID();
    stopCommands(endToken);
    expect(writeSpy.mock.calls).toStrictEqual([
      [`::stop-commands::${endToken}${EOL}`],
    ]);
  });
});

describe("resumeCommands", () => {
  test("writes resume token to stdout", () => {
    const endToken = randomUUID();
    resumeCommands(endToken);
    expect(writeSpy.mock.calls).toStrictEqual([[`::${endToken}::${EOL}`]]);
  });
});
