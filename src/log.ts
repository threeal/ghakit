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
 * Optional annotation parameters for workflow commands that support annotations.
 */
export interface AnnotationOptions {
  /**
   * Custom title displayed in the annotation header.
   */
  title?: string;

  /**
   * Path to the file associated with the annotation, relative to the repository root.
   */
  file?: string;

  /**
   * Starting line number of the annotation within the file.
   */
  line?: number;

  /**
   * Ending line number of the annotation within the file.
   */
  endLine?: number;

  /**
   * Starting column number of the annotation within the file.
   *
   * Named `col` (not `column`) to match GitHub's workflow command parameter name,
   * which uses `col` for the start and `endColumn` for the end.
   */
  col?: number;

  /**
   * Ending column number of the annotation within the file.
   */
  endColumn?: number;
}

function formatAnnotationParams(options: AnnotationOptions): string {
  const params = Object.entries(options)
    .filter(([, v]) => v !== undefined)
    .map(([k, v]) => `${k}=${String(v)}`)
    .join(",");
  return params ? ` ${params}` : "";
}

/**
 * Logs a notice message in GitHub Actions.
 *
 * @param message - The notice message to log.
 * @param options - Optional annotation parameters to pin the message to a file location.
 */
export function logNotice(message: string, options?: AnnotationOptions): void {
  const params = options ? formatAnnotationParams(options) : "";
  process.stdout.write(`::notice${params}::${message}${EOL}`);
}

/**
 * Logs a warning message in GitHub Actions.
 *
 * @param message - The warning message to log.
 * @param options - Optional annotation parameters to pin the message to a file location.
 */
export function logWarning(message: string, options?: AnnotationOptions): void {
  const params = options ? formatAnnotationParams(options) : "";
  process.stdout.write(`::warning${params}::${message}${EOL}`);
}

/**
 * Logs an error message in GitHub Actions.
 *
 * @param err - The error, which can be of any type.
 * @param options - Optional annotation parameters to pin the message to a file location.
 */
export function logError(err: unknown, options?: AnnotationOptions): void {
  const message = err instanceof Error ? err.message : String(err);
  const params = options ? formatAnnotationParams(options) : "";
  process.stdout.write(`::error${params}::${message}${EOL}`);
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
 * Begins a log group in GitHub Actions. Close it with {@link endLogGroup}.
 *
 * @param name - The name of the log group.
 */
export function beginLogGroup(name: string): void {
  process.stdout.write(`::group::${name}${EOL}`);
}

/**
 * Ends the log group opened by {@link beginLogGroup}.
 */
export function endLogGroup(): void {
  process.stdout.write(`::endgroup::${EOL}`);
}

/**
 * Stops processing workflow commands in GitHub Actions until
 * {@link resumeCommands} is called with the same token.
 *
 * @param endToken - A unique token identifying this stop/resume pair.
 */
export function stopCommands(endToken: string): void {
  process.stdout.write(`::stop-commands::${endToken}${EOL}`);
}

/**
 * Resumes processing workflow commands in GitHub Actions after
 * {@link stopCommands} was called with the same token.
 *
 * @param endToken - The token that was passed to {@link stopCommands}.
 */
export function resumeCommands(endToken: string): void {
  process.stdout.write(`::${endToken}::${EOL}`);
}
