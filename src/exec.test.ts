import {
  type MockInstance,
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from "vitest";

import { exec } from "./exec.js";
import { logCommand } from "./log.js";

vi.mock("./log.js");

const script = "process.stdout.write('out'); process.stderr.write('err')";

let stdoutWriteSpy: MockInstance;
let stderrWriteSpy: MockInstance;

beforeEach(() => {
  vi.clearAllMocks();
  stdoutWriteSpy = vi.spyOn(process.stdout, "write").mockReturnValue(true);
  stderrWriteSpy = vi.spyOn(process.stderr, "write").mockReturnValue(true);
});

afterEach(() => vi.restoreAllMocks());

function spyOutput(spy: MockInstance): string {
  return spy.mock.calls
    .map(([arg]) => (Buffer.isBuffer(arg) ? arg.toString() : String(arg)))
    .join("");
}

describe("exec", () => {
  test("rejects on failed command", async () => {
    await expect(exec("node", ["-e", "process.exit(1)"])).rejects.toThrow(
      'Process "node" exited with code 1',
    );
  });

  test("executes without options", async () => {
    await expect(exec("node", ["-e", script])).resolves.toBeUndefined();

    expect(vi.mocked(logCommand).mock.calls).toStrictEqual([
      ["node", "-e", script],
    ]);

    expect(spyOutput(stdoutWriteSpy)).toBe("out");
    expect(spyOutput(stderrWriteSpy)).toBe("err");
  });

  test("executes with capture option", async () => {
    await expect(
      exec("node", ["-e", script], { capture: true }),
    ).resolves.toStrictEqual({ stdout: "out" });

    expect(vi.mocked(logCommand).mock.calls).toStrictEqual([
      ["node", "-e", script],
    ]);

    expect(spyOutput(stdoutWriteSpy)).toBe("out");
    expect(spyOutput(stderrWriteSpy)).toBe("err");
  });

  test("executes with silent option", async () => {
    await expect(
      exec("node", ["-e", script], { silent: true }),
    ).resolves.toBeUndefined();

    expect(vi.mocked(logCommand)).not.toHaveBeenCalled();
    expect(stdoutWriteSpy).not.toHaveBeenCalled();
    expect(stderrWriteSpy).not.toHaveBeenCalled();
  });

  test("executes with all options", async () => {
    await expect(
      exec("node", ["-e", script], { silent: true, capture: true }),
    ).resolves.toStrictEqual({ stdout: "out" });

    expect(vi.mocked(logCommand)).not.toHaveBeenCalled();
    expect(stdoutWriteSpy).not.toHaveBeenCalled();
    expect(stderrWriteSpy).not.toHaveBeenCalled();
  });
});
