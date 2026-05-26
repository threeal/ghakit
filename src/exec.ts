import { spawn } from "node:child_process";

/**
 * The output mode for stdout or stderr in {@link exec}.
 *
 * - `"inherit"` — pass the output to the current process.
 * - `"capture"` — collect and return the output as a string.
 * - `"silent"` — suppress the output entirely.
 */
export type OutputMode = "inherit" | "capture" | "silent";

/**
 * Options for configuring the behaviour of {@link exec}.
 */
export interface ExecOptions {
  /**
   * Output mode for the child process stdout (default: `"inherit"`).
   */
  stdout?: OutputMode;

  /**
   * Output mode for the child process stderr (default: `"inherit"`).
   */
  stderr?: OutputMode;
}

/**
 * Executes a command as a child process, capturing both stdout and stderr.
 *
 * Both streams are collected and returned as strings instead of being passed
 * to the current process.
 *
 * @param command - The command to execute.
 * @param args - The arguments to pass to the command.
 * @param opts - Options with both `stdout` and `stderr` set to `"capture"`.
 * @returns A promise that resolves to an object containing the captured stdout
 *   and stderr when the process exits successfully.
 */
export function exec(
  command: string,
  args: string[],
  opts: ExecOptions & { stdout: "capture"; stderr: "capture" },
): Promise<{ stdout: string; stderr: string }>;

/**
 * Executes a command as a child process, capturing stdout.
 *
 * stdout is collected and returned as a string instead of being passed to the
 * current process. stderr defaults to `"inherit"`.
 *
 * @param command - The command to execute.
 * @param args - The arguments to pass to the command.
 * @param opts - Options with `stdout` set to `"capture"`.
 * @returns A promise that resolves to an object containing the captured stdout
 *   when the process exits successfully.
 */
export function exec(
  command: string,
  args: string[],
  opts: ExecOptions & { stdout: "capture" },
): Promise<{ stdout: string }>;

/**
 * Executes a command as a child process, capturing stderr.
 *
 * stderr is collected and returned as a string instead of being passed to the
 * current process. stdout defaults to `"inherit"`.
 *
 * @param command - The command to execute.
 * @param args - The arguments to pass to the command.
 * @param opts - Options with `stderr` set to `"capture"`.
 * @returns A promise that resolves to an object containing the captured stderr
 *   when the process exits successfully.
 */
export function exec(
  command: string,
  args: string[],
  opts: ExecOptions & { stderr: "capture" },
): Promise<{ stderr: string }>;

/**
 * Executes a command as a child process.
 *
 * By default, both stdout and stderr use `"inherit"` mode, passing the output
 * to the current process. Set either to `"silent"` to suppress the output, or
 * `"capture"` to collect and return it as a string.
 *
 * @param command - The command to execute.
 * @param args - The arguments to pass to the command.
 * @param opts - Options for configuring the execution behaviour.
 * @returns A promise that resolves when the process exits successfully.
 */
export function exec(
  command: string,
  args: string[],
  opts?: ExecOptions,
): Promise<void>;

export function exec(
  command: string,
  args: string[],
  opts?: ExecOptions,
): Promise<{ stdout?: string; stderr?: string } | void> {
  return new Promise((resolve, reject) => {
    const stdoutMode = opts?.stdout ?? "inherit";
    const stderrMode = opts?.stderr ?? "inherit";

    const proc = spawn(command, args, {
      stdio: [
        "inherit",
        stdoutMode === "inherit"
          ? "inherit"
          : stdoutMode === "capture"
            ? "pipe"
            : "ignore",
        stderrMode === "inherit"
          ? "inherit"
          : stderrMode === "capture"
            ? "pipe"
            : "ignore",
      ],
    });

    const stdoutChunks: Uint8Array[] = [];
    if (proc.stdout !== null) {
      proc.stdout.on("data", (chunk: Buffer) => stdoutChunks.push(chunk));
    }

    const stderrChunks: Uint8Array[] = [];
    if (proc.stderr !== null) {
      proc.stderr.on("data", (chunk: Buffer) => stderrChunks.push(chunk));
    }

    proc.on("error", reject);
    proc.on("close", (code) => {
      if (code === 0) {
        if (stdoutMode === "capture" || stderrMode === "capture") {
          const result: { stdout?: string; stderr?: string } = {};
          if (stdoutMode === "capture") {
            result.stdout = Buffer.concat(stdoutChunks).toString();
          }
          if (stderrMode === "capture") {
            result.stderr = Buffer.concat(stderrChunks).toString();
          }
          resolve(result);
        } else {
          resolve();
        }
      } else {
        reject(
          new Error(
            code !== null
              ? `Process "${command}" exited with code ${code.toString()}`
              : `Process "${command}" was terminated by a signal`,
          ),
        );
      }
    });
  });
}
