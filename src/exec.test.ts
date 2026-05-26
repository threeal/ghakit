import { describe, expect, test } from "vitest";

import { exec } from "./exec.js";

const script = "process.stdout.write('out'); process.stderr.write('err')";

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
  });

  test("executes with stdout capture", async () => {
    await expect(
      exec("node", ["-e", script], { stdout: "capture" }),
    ).resolves.toStrictEqual({ stdout: "out" });
  });

  test("executes with stderr capture", async () => {
    await expect(
      exec("node", ["-e", script], { stderr: "capture" }),
    ).resolves.toStrictEqual({ stderr: "err" });
  });

  test("executes with both capture", async () => {
    await expect(
      exec("node", ["-e", script], { stdout: "capture", stderr: "capture" }),
    ).resolves.toStrictEqual({ stdout: "out", stderr: "err" });
  });

  test("executes with stdout silent", async () => {
    await expect(
      exec("node", ["-e", script], { stdout: "silent" }),
    ).resolves.toBeUndefined();
  });

  test("executes with stderr silent", async () => {
    await expect(
      exec("node", ["-e", script], { stderr: "silent" }),
    ).resolves.toBeUndefined();
  });

  test("executes with both silent", async () => {
    await expect(
      exec("node", ["-e", script], { stdout: "silent", stderr: "silent" }),
    ).resolves.toBeUndefined();
  });
});
