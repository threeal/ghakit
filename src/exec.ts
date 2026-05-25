import { spawn } from "node:child_process";

import { logCommand } from "./log.js";

/**
 * Options for configuring the behaviour of {@link exec}.
 */
export interface ExecOptions {
  /**
   * When `true`, suppresses command logging and stdout/stderr piping.
   */
  silent?: boolean;

  /**
   * When `true`, captures the process stdout and returns it in the resolved
   * value.
   */
  capture?: boolean;
}

/**
 * The result returned by {@link exec} when the `capture` option is enabled.
 */
export interface ExecResult {
  /**
   * The captured standard output of the process.
   */
  stdout: string;
}

/**
 * Executes a command as a child process and returns the captured output.
 *
 * By default, logs the command using {@link logCommand} and pipes both stdout
 * and stderr to the current process streams. Pass `silent: true` to suppress
 * logging and piping. Stdout is also captured and returned in the resolved
 * value.
 *
 * @param command - The command to execute.
 * @param args - The arguments to pass to the command.
 * @param opts - Options for configuring the execution behaviour, with
 *   `capture` set to `true`.
 * @returns A promise that resolves to an {@link ExecResult} containing the
 *   captured stdout when the process exits successfully.
 */
export function exec(
  command: string,
  args: string[],
  opts: ExecOptions & { capture: true },
): Promise<ExecResult>;

/**
 * Executes a command as a child process.
 *
 * By default, logs the command using {@link logCommand} and pipes both stdout
 * and stderr to the current process streams. Pass `silent: true` to suppress
 * logging and piping, or `capture: true` to also collect and return the stdout.
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
): Promise<ExecResult | void> {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args);

    if (!opts?.silent) {
      logCommand(command, ...args);
      proc.stdout.pipe(process.stdout);
      proc.stderr.pipe(process.stderr);
    }

    const chunks: Uint8Array[] = [];
    if (opts?.capture) {
      proc.stdout.on("data", (chunk: Buffer) => chunks.push(chunk));
    }

    proc.on("error", reject);
    proc.on("close", (code: number) => {
      if (code === 0) {
        if (opts?.capture) {
          resolve({ stdout: Buffer.concat(chunks).toString() });
        } else {
          resolve();
        }
      } else {
        reject(
          new Error(`Process "${command}" exited with code ${code.toString()}`),
        );
      }
    });
  });
}
