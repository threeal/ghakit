import { EOL } from "node:os";

/**
 * Logs an information message in GitHub Actions.
 *
 * @param message - The information message to log.
 */
export function logInfo(message: string): void {
  process.stdout.write(`${message}${EOL}`);
}

/**
 * Logs a debug message in GitHub Actions.
 *
 * @param message - The debug message to log.
 */
export function logDebug(message: string): void {
  process.stdout.write(`::debug::${message}${EOL}`);
}

/**
 * Logs a warning message in GitHub Actions.
 *
 * @param message - The warning message to log.
 */
export function logWarning(message: string): void {
  process.stdout.write(`::warning::${message}${EOL}`);
}

/**
 * Logs an error message in GitHub Actions.
 *
 * @param err - The error, which can be of any type.
 */
export function logError(err: unknown): void {
  const message = err instanceof Error ? err.message : String(err);
  process.stdout.write(`::error::${message}${EOL}`);
}

/**
 * Logs a command along with its arguments in GitHub Actions.
 *
 * @param command - The command to log.
 * @param args - The arguments of the command.
 */
export function logCommand(command: string, ...args: string[]): void {
  const message = [command, ...args].join(" ");
  process.stdout.write(`[command]${message}${EOL}`);
}

/**
 * Masks a value in GitHub Actions logs.
 *
 * @param value - The value to mask. Any occurrence of this value in subsequent
 *   log output will be replaced with `***`.
 */
export function addLogMask(value: string): void {
  process.stdout.write(`::add-mask::${value}${EOL}`);
}

/**
 * Begins a log group in GitHub Actions.
 *
 * @param name - The name of the log group.
 */
export function beginLogGroup(name: string): void {
  process.stdout.write(`::group::${name}${EOL}`);
}

/**
 * Ends the current log group in GitHub Actions.
 */
export function endLogGroup(): void {
  process.stdout.write(`::endgroup::${EOL}`);
}

/**
 * Stops processing workflow commands in GitHub Actions until resumed.
 *
 * @param endToken - A token used to resume command processing.
 */
export function stopCommands(endToken: string): void {
  process.stdout.write(`::stop-commands::${endToken}${EOL}`);
}

/**
 * Resumes processing workflow commands in GitHub Actions.
 *
 * @param endToken - The token that was used to stop command processing.
 */
export function resumeCommands(endToken: string): void {
  process.stdout.write(`::${endToken}::${EOL}`);
}
