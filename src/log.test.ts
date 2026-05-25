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
  addLogMask,
  beginLogGroup,
  endLogGroup,
  logCommand,
  logDebug,
  logError,
  logInfo,
  logNotice,
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

describe("logNotice", () => {
  test("writes notice command to stdout", () => {
    logNotice("a notice message");
    expect(writeSpy.mock.calls).toStrictEqual([
      [`::notice::a notice message${EOL}`],
    ]);
  });

  test("writes notice command with empty options to stdout", () => {
    logNotice("a notice message", {});
    expect(writeSpy.mock.calls).toStrictEqual([
      [`::notice::a notice message${EOL}`],
    ]);
  });

  test("writes notice command with one option to stdout", () => {
    logNotice("a notice message", { file: "foo.ts" });
    expect(writeSpy.mock.calls).toStrictEqual([
      [`::notice file=foo.ts::a notice message${EOL}`],
    ]);
  });

  test("writes notice command with all options to stdout", () => {
    logNotice("a notice message", {
      title: "a title",
      file: "foo.ts",
      line: 1,
      endLine: 2,
      col: 3,
      endColumn: 4,
    });
    expect(writeSpy.mock.calls).toStrictEqual([
      [
        `::notice title=a title,file=foo.ts,line=1,endLine=2,col=3,endColumn=4::a notice message${EOL}`,
      ],
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

  test("writes warning command with empty options to stdout", () => {
    logWarning("a warning message", {});
    expect(writeSpy.mock.calls).toStrictEqual([
      [`::warning::a warning message${EOL}`],
    ]);
  });

  test("writes warning command with one option to stdout", () => {
    logWarning("a warning message", { file: "foo.ts" });
    expect(writeSpy.mock.calls).toStrictEqual([
      [`::warning file=foo.ts::a warning message${EOL}`],
    ]);
  });

  test("writes warning command with all options to stdout", () => {
    logWarning("a warning message", {
      title: "a title",
      file: "foo.ts",
      line: 1,
      endLine: 2,
      col: 3,
      endColumn: 4,
    });
    expect(writeSpy.mock.calls).toStrictEqual([
      [
        `::warning title=a title,file=foo.ts,line=1,endLine=2,col=3,endColumn=4::a warning message${EOL}`,
      ],
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

  test("writes error command with empty options to stdout", () => {
    logError("an error message", {});
    expect(writeSpy.mock.calls).toStrictEqual([
      [`::error::an error message${EOL}`],
    ]);
  });

  test("writes error command with one option to stdout", () => {
    logError("an error message", { file: "foo.ts" });
    expect(writeSpy.mock.calls).toStrictEqual([
      [`::error file=foo.ts::an error message${EOL}`],
    ]);
  });

  test("writes error command with all options to stdout", () => {
    logError("an error message", {
      title: "a title",
      file: "foo.ts",
      line: 1,
      endLine: 2,
      col: 3,
      endColumn: 4,
    });
    expect(writeSpy.mock.calls).toStrictEqual([
      [
        `::error title=a title,file=foo.ts,line=1,endLine=2,col=3,endColumn=4::an error message${EOL}`,
      ],
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

describe("addLogMask", () => {
  test("writes add-mask command to stdout", () => {
    addLogMask("a secret value");
    expect(writeSpy.mock.calls).toStrictEqual([
      [`::add-mask::a secret value${EOL}`],
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
