import { beforeEach, describe, expect, test, vi } from "vitest";

import { exec } from "./exec.js";
import { logCommand } from "./log.js";

vi.mock("./log.js");

const script = "process.stdout.write('out'); process.stderr.write('err')";

beforeEach(() => vi.clearAllMocks());

describe("exec", () => {
  test("rejects on failed command", async () => {
    await expect(exec("node", ["-e", "process.exit(1)"])).rejects.toThrow(
      'Process "node" exited with code 1',
    );
  });

  test("rejects on signal-killed process", async () => {
    await expect(
      exec("node", ["-e", "process.kill(process.pid, 'SIGTERM')"]),
    ).rejects.toThrow('Process "node" was terminated by a signal');
  });

  test("executes without options", async () => {
    await expect(exec("node", ["-e", script])).resolves.toBeUndefined();

    expect(vi.mocked(logCommand).mock.calls).toStrictEqual([
      ["node", "-e", script],
    ]);
  });

  test("executes with stdout capture", async () => {
    await expect(
      exec("node", ["-e", script], { stdout: "capture" }),
    ).resolves.toStrictEqual({ stdout: "out" });

    expect(vi.mocked(logCommand)).not.toHaveBeenCalled();
  });

  test("executes with stderr capture", async () => {
    await expect(
      exec("node", ["-e", script], { stderr: "capture" }),
    ).resolves.toStrictEqual({ stderr: "err" });

    expect(vi.mocked(logCommand).mock.calls).toStrictEqual([
      ["node", "-e", script],
    ]);
  });

  test("executes with both capture", async () => {
    await expect(
      exec("node", ["-e", script], { stdout: "capture", stderr: "capture" }),
    ).resolves.toStrictEqual({ stdout: "out", stderr: "err" });

    expect(vi.mocked(logCommand)).not.toHaveBeenCalled();
  });

  test("executes with stdout silent", async () => {
    await expect(
      exec("node", ["-e", script], { stdout: "silent" }),
    ).resolves.toBeUndefined();

    expect(vi.mocked(logCommand)).not.toHaveBeenCalled();
  });

  test("executes with stderr silent", async () => {
    await expect(
      exec("node", ["-e", script], { stderr: "silent" }),
    ).resolves.toBeUndefined();

    expect(vi.mocked(logCommand).mock.calls).toStrictEqual([
      ["node", "-e", script],
    ]);
  });

  test("executes with both silent", async () => {
    await expect(
      exec("node", ["-e", script], { stdout: "silent", stderr: "silent" }),
    ).resolves.toBeUndefined();

    expect(vi.mocked(logCommand)).not.toHaveBeenCalled();
  });
});
