import { appendFileSync } from "node:fs";
import { appendFile } from "node:fs/promises";
import { EOL } from "node:os";
import { delimiter } from "node:path";

/**
 * @internal
 * Retrieves the value of an environment variable.
 *
 * @param name - The name of the environment variable.
 * @returns The value of the environment variable.
 * @throws Error if the environment variable is not defined.
 */
export function mustGetEnvironment(name: string): string {
  const value = process.env[name];
  if (value === undefined) {
    throw new Error(`the ${name} environment variable must be defined`);
  }
  return value;
}

/**
 * Retrieves the value of a GitHub Actions input.
 *
 * @param name - The name of the GitHub Actions input.
 * @returns The value of the GitHub Actions input, or an empty string if not found.
 */
export function getInput(name: string): string {
  const value = process.env[`INPUT_${name.toUpperCase()}`] ?? "";
  return value.trim();
}

/**
 * Sets the value of a GitHub Actions output.
 *
 * @param name - The name of the GitHub Actions output.
 * @param value - The value to set for the GitHub Actions output.
 * @returns A promise that resolves when the value is successfully set.
 */
export async function setOutput(name: string, value: string): Promise<void> {
  const filePath = mustGetEnvironment("GITHUB_OUTPUT");
  await appendFile(filePath, `${name}=${value}${EOL}`);
}

/**
 * Sets the value of a GitHub Actions output synchronously.
 *
 * @param name - The name of the GitHub Actions output.
 * @param value - The value to set for the GitHub Actions output.
 */
export function setOutputSync(name: string, value: string): void {
  const filePath = mustGetEnvironment("GITHUB_OUTPUT");
  appendFileSync(filePath, `${name}=${value}${EOL}`);
}

/**
 * Retrieves the value of a GitHub Actions state.
 *
 * @param name - The name of the GitHub Actions state.
 * @returns The value of the GitHub Actions state, or an empty string if not found.
 */
export function getState(name: string): string {
  const value = process.env[`STATE_${name}`] ?? "";
  return value.trim();
}

/**
 * Sets the value of a GitHub Actions state.
 *
 * @param name - The name of the GitHub Actions state.
 * @param value - The value to set for the GitHub Actions state.
 * @returns A promise that resolves when the value is successfully set.
 */
export async function setState(name: string, value: string): Promise<void> {
  process.env[`STATE_${name}`] = value;
  const filePath = mustGetEnvironment("GITHUB_STATE");
  await appendFile(filePath, `${name}=${value}${EOL}`);
}

/**
 * Sets the value of a GitHub Actions state synchronously.
 *
 * @param name - The name of the GitHub Actions state.
 * @param value - The value to set for the GitHub Actions state.
 */
export function setStateSync(name: string, value: string): void {
  process.env[`STATE_${name}`] = value;
  const filePath = mustGetEnvironment("GITHUB_STATE");
  appendFileSync(filePath, `${name}=${value}${EOL}`);
}

/**
 * Sets the value of an environment variable in GitHub Actions.
 *
 * @param name - The name of the environment variable.
 * @param value - The value to set for the environment variable.
 * @returns A promise that resolves when the environment variable is
 *          successfully set.
 */
export async function setEnv(name: string, value: string): Promise<void> {
  process.env[name] = value;
  const filePath = mustGetEnvironment("GITHUB_ENV");
  await appendFile(filePath, `${name}=${value}${EOL}`);
}

/**
 * Sets the value of an environment variable in GitHub Actions synchronously.
 *
 * @param name - The name of the environment variable.
 * @param value - The value to set for the environment variable.
 */
export function setEnvSync(name: string, value: string): void {
  process.env[name] = value;
  const filePath = mustGetEnvironment("GITHUB_ENV");
  appendFileSync(filePath, `${name}=${value}${EOL}`);
}

/**
 * Adds a system path to the environment in GitHub Actions.
 *
 * @param sysPath - The system path to add to the environment.
 * @returns A promise that resolves when the system path is successfully added.
 */
export async function addPath(sysPath: string): Promise<void> {
  process.env.PATH =
    process.env.PATH !== undefined
      ? `${sysPath}${delimiter}${process.env.PATH}`
      : sysPath;

  const filePath = mustGetEnvironment("GITHUB_PATH");
  await appendFile(filePath, `${sysPath}${EOL}`);
}

/**
 * Adds a system path to the environment in GitHub Actions synchronously.
 *
 * @param sysPath - The system path to add to the environment.
 */
export function addPathSync(sysPath: string): void {
  process.env.PATH =
    process.env.PATH !== undefined
      ? `${sysPath}${delimiter}${process.env.PATH}`
      : sysPath;

  const filePath = mustGetEnvironment("GITHUB_PATH");
  appendFileSync(filePath, `${sysPath}${EOL}`);
}
