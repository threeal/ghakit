import { appendFileSync } from "node:fs";
import { appendFile } from "node:fs/promises";
import { EOL } from "node:os";
import { delimiter } from "node:path";

import {
  getGitHubEnv,
  getGitHubOutput,
  getGitHubPath,
  getGitHubState,
} from "./vars.js";

/**
 * Retrieves the value of a GitHub Actions input.
 *
 * Input names are matched case-insensitively — `getInput("token")` and
 * `getInput("TOKEN")` both read the same `INPUT_TOKEN` env var.
 *
 * @param name - The name of the GitHub Actions input.
 * @returns The trimmed value of the GitHub Actions input, or an empty string if not set.
 */
export function getInput(name: string): string {
  const value = process.env[`INPUT_${name.toUpperCase()}`] ?? "";
  return value.trim();
}

/**
 * Sets the value of a GitHub Actions output.
 *
 * Appends the value to the output file so it is available to subsequent steps
 * in the workflow.
 *
 * @param name - The name of the GitHub Actions output.
 * @param value - The value to set for the GitHub Actions output.
 * @returns A promise that resolves when the value is successfully set.
 */
export async function setOutput(name: string, value: string): Promise<void> {
  await appendFile(getGitHubOutput(), `${name}=${value}${EOL}`);
}

/**
 * Sets the value of a GitHub Actions output synchronously.
 *
 * Appends the value to the output file so it is available to subsequent steps
 * in the workflow.
 *
 * @param name - The name of the GitHub Actions output.
 * @param value - The value to set for the GitHub Actions output.
 */
export function setOutputSync(name: string, value: string): void {
  appendFileSync(getGitHubOutput(), `${name}=${value}${EOL}`);
}

/**
 * Retrieves the value of a GitHub Actions state.
 *
 * State names are case-sensitive — use the exact same casing that was passed
 * to {@link setState}.
 *
 * @param name - The name of the GitHub Actions state.
 * @returns The trimmed value of the GitHub Actions state, or an empty string if not set.
 */
export function getState(name: string): string {
  const value = process.env[`STATE_${name}`] ?? "";
  return value.trim();
}

/**
 * Sets the value of a GitHub Actions state.
 *
 * Makes the state available in the current process and persists it across
 * the pre, main, and post steps of the same action.
 *
 * @param name - The name of the GitHub Actions state.
 * @param value - The value to set for the GitHub Actions state.
 * @returns A promise that resolves when the value is successfully set.
 */
export async function setState(name: string, value: string): Promise<void> {
  process.env[`STATE_${name}`] = value;
  await appendFile(getGitHubState(), `${name}=${value}${EOL}`);
}

/**
 * Sets the value of a GitHub Actions state synchronously.
 *
 * Makes the state available in the current process and persists it across
 * the pre, main, and post steps of the same action.
 *
 * @param name - The name of the GitHub Actions state.
 * @param value - The value to set for the GitHub Actions state.
 */
export function setStateSync(name: string, value: string): void {
  process.env[`STATE_${name}`] = value;
  appendFileSync(getGitHubState(), `${name}=${value}${EOL}`);
}

/**
 * Sets the value of an environment variable in GitHub Actions.
 *
 * Updates `process.env` immediately so the variable is available in the
 * current process, and appends it to the env file for subsequent steps.
 *
 * @param name - The name of the environment variable.
 * @param value - The value to set for the environment variable.
 * @returns A promise that resolves when the environment variable is successfully set.
 */
export async function setEnv(name: string, value: string): Promise<void> {
  process.env[name] = value;
  await appendFile(getGitHubEnv(), `${name}=${value}${EOL}`);
}

/**
 * Sets the value of an environment variable in GitHub Actions synchronously.
 *
 * Updates `process.env` immediately so the variable is available in the
 * current process, and appends it to the env file for subsequent steps.
 *
 * @param name - The name of the environment variable.
 * @param value - The value to set for the environment variable.
 */
export function setEnvSync(name: string, value: string): void {
  process.env[name] = value;
  appendFileSync(getGitHubEnv(), `${name}=${value}${EOL}`);
}

/**
 * Adds a system path to the environment in GitHub Actions.
 *
 * Prepends the path to `process.env.PATH` immediately so it is available in
 * the current process, and appends it to the path file for subsequent steps.
 *
 * @param sysPath - The system path to add to the environment.
 * @returns A promise that resolves when the system path is successfully added.
 */
export async function addPath(sysPath: string): Promise<void> {
  process.env.PATH =
    process.env.PATH !== undefined
      ? `${sysPath}${delimiter}${process.env.PATH}`
      : sysPath;

  await appendFile(getGitHubPath(), `${sysPath}${EOL}`);
}

/**
 * Adds a system path to the environment in GitHub Actions synchronously.
 *
 * Prepends the path to `process.env.PATH` immediately so it is available in
 * the current process, and appends it to the path file for subsequent steps.
 *
 * @param sysPath - The system path to add to the environment.
 */
export function addPathSync(sysPath: string): void {
  process.env.PATH =
    process.env.PATH !== undefined
      ? `${sysPath}${delimiter}${process.env.PATH}`
      : sysPath;

  appendFileSync(getGitHubPath(), `${sysPath}${EOL}`);
}
