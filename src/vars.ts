/**
 * Returns whether the workflow is running in a CI environment.
 *
 * @returns `true` if running in a CI environment, `false` otherwise.
 */
export function getCI(): boolean {
  return process.env.CI === "true";
}

/**
 * Returns the name or ID of the currently running action or step.
 *
 * For scripts without an ID, GitHub uses `__run`. Repeated invocations get
 * numeric suffixes (e.g. `__run_2`).
 *
 * @returns The name or ID of the currently running action or step.
 */
export function getGitHubAction(): string {
  return process.env.GITHUB_ACTION ?? "";
}

/**
 * Returns the path where the currently running action is located.
 *
 * Only set in composite actions. Useful for accessing files in the action's
 * own repository.
 *
 * @returns The path where the action is located, or `undefined` outside of
 *   composite actions.
 */
export function getGitHubActionPath(): string | undefined {
  return process.env.GITHUB_ACTION_PATH;
}

/**
 * Returns the owner and repository name of the action being executed.
 *
 * Only set for steps that execute an action (e.g. `actions/checkout`).
 *
 * @returns The action repository in `owner/repo` format, or `undefined` if
 *   the step is not executing an action.
 */
export function getGitHubActionRepository(): string | undefined {
  return process.env.GITHUB_ACTION_REPOSITORY;
}

/**
 * Returns whether the workflow is running in GitHub Actions.
 *
 * Always `true` when GitHub Actions is executing the workflow. Useful for
 * differentiating local runs from automated CI runs.
 *
 * @returns `true` if running in GitHub Actions, `false` otherwise.
 */
export function getGitHubActions(): boolean {
  return process.env.GITHUB_ACTIONS === "true";
}

/**
 * Returns the username of the person or app that triggered the workflow.
 *
 * @returns The actor's username.
 */
export function getGitHubActor(): string {
  return process.env.GITHUB_ACTOR ?? "";
}

/**
 * Returns the account ID of the person or app that triggered the workflow.
 *
 * This is the numeric ID, distinct from the username in `GITHUB_ACTOR`.
 *
 * @returns The actor's account ID.
 */
export function getGitHubActorId(): string {
  return process.env.GITHUB_ACTOR_ID ?? "";
}

/**
 * Returns the GitHub API URL.
 *
 * @returns The API URL, e.g. `https://api.github.com`.
 */
export function getGitHubApiUrl(): string {
  return process.env.GITHUB_API_URL ?? "";
}

/**
 * Returns the target branch of a pull request.
 *
 * Only set when the triggering event is `pull_request` or
 * `pull_request_target`.
 *
 * @returns The base branch name, or `undefined` outside of pull request events.
 */
export function getGitHubBaseRef(): string | undefined {
  return process.env.GITHUB_BASE_REF;
}

/**
 * Returns the path to the file used to set environment variables from
 * workflow commands.
 *
 * @returns The path to the GitHub env file.
 */
export function getGitHubEnv(): string {
  return process.env.GITHUB_ENV ?? "";
}

/**
 * Returns the name of the event that triggered the workflow.
 *
 * @returns The event name, e.g. `push`, `pull_request`.
 */
export function getGitHubEventName(): string {
  return process.env.GITHUB_EVENT_NAME ?? "";
}

/**
 * Returns the path to the file containing the full event webhook payload.
 *
 * @returns The path to the event payload file.
 */
export function getGitHubEventPath(): string {
  return process.env.GITHUB_EVENT_PATH ?? "";
}

/**
 * Returns the GitHub GraphQL API URL.
 *
 * @returns The GraphQL API URL, e.g. `https://api.github.com/graphql`.
 */
export function getGitHubGraphqlUrl(): string {
  return process.env.GITHUB_GRAPHQL_URL ?? "";
}

/**
 * Returns the source branch of a pull request.
 *
 * Only set when the triggering event is `pull_request` or
 * `pull_request_target`.
 *
 * @returns The head branch name, or `undefined` outside of pull request events.
 */
export function getGitHubHeadRef(): string | undefined {
  return process.env.GITHUB_HEAD_REF;
}

/**
 * Returns the `job_id` of the current job as defined in the workflow file.
 *
 * @returns The current job ID.
 */
export function getGitHubJob(): string {
  return process.env.GITHUB_JOB ?? "";
}

/**
 * Returns the path to the file used to set step outputs from workflow
 * commands.
 *
 * @returns The path to the GitHub output file.
 */
export function getGitHubOutput(): string {
  return process.env.GITHUB_OUTPUT ?? "";
}

/**
 * Returns the path to the file used to prepend entries to the system `PATH`
 * from workflow commands.
 *
 * @returns The path to the GitHub path file.
 */
export function getGitHubPath(): string {
  return process.env.GITHUB_PATH ?? "";
}

/**
 * Returns the fully-formed ref that triggered the workflow.
 *
 * @returns The full ref string, e.g. `refs/heads/main`, `refs/tags/v1.0`.
 */
export function getGitHubRef(): string {
  return process.env.GITHUB_REF ?? "";
}

/**
 * Returns the short ref name of the branch or tag that triggered the run.
 *
 * For unmerged pull requests the format is `<pr_number>/merge`.
 *
 * @returns The short ref name.
 */
export function getGitHubRefName(): string {
  return process.env.GITHUB_REF_NAME ?? "";
}

/**
 * Returns whether branch protections or rulesets are configured for the
 * triggering ref.
 *
 * @returns `true` if the ref is protected, `false` otherwise.
 */
export function getGitHubRefProtected(): boolean {
  return process.env.GITHUB_REF_PROTECTED === "true";
}

/**
 * Returns the type of ref that triggered the workflow run.
 *
 * @returns The ref type, either `branch` or `tag`.
 */
export function getGitHubRefType(): string {
  return process.env.GITHUB_REF_TYPE ?? "";
}

/**
 * Returns the owner and repository name for the current repository.
 *
 * @returns The repository name in `owner/repo` format, e.g. `octocat/Hello-World`.
 */
export function getGitHubRepository(): string {
  return process.env.GITHUB_REPOSITORY ?? "";
}

/**
 * Returns the unique numeric ID of the repository.
 *
 * This is distinct from the repository name.
 *
 * @returns The repository ID.
 */
export function getGitHubRepositoryId(): string {
  return process.env.GITHUB_REPOSITORY_ID ?? "";
}

/**
 * Returns the repository owner's username.
 *
 * @returns The repository owner's username.
 */
export function getGitHubRepositoryOwner(): string {
  return process.env.GITHUB_REPOSITORY_OWNER ?? "";
}

/**
 * Returns the unique numeric account ID of the repository owner.
 *
 * This is distinct from the owner's username.
 *
 * @returns The repository owner's account ID.
 */
export function getGitHubRepositoryOwnerId(): string {
  return process.env.GITHUB_REPOSITORY_OWNER_ID ?? "";
}

/**
 * Returns the number of days that workflow run logs and artifacts are retained.
 *
 * @returns The retention period in days.
 */
export function getGitHubRetentionDays(): number {
  return parseInt(process.env.GITHUB_RETENTION_DAYS ?? "0", 10);
}

/**
 * Returns the attempt number for the current workflow run.
 *
 * Starts at `1` for the first attempt and increments with each re-run.
 *
 * @returns The run attempt number.
 */
export function getGitHubRunAttempt(): number {
  return parseInt(process.env.GITHUB_RUN_ATTEMPT ?? "0", 10);
}

/**
 * Returns the unique ID for the current workflow run within the repository.
 *
 * This value does not change if the workflow is re-run.
 *
 * @returns The workflow run ID.
 */
export function getGitHubRunId(): string {
  return process.env.GITHUB_RUN_ID ?? "";
}

/**
 * Returns the sequential run number for the workflow within the repository.
 *
 * Starts at `1` for the first run and increments with each new run.
 *
 * @returns The workflow run number.
 */
export function getGitHubRunNumber(): number {
  return parseInt(process.env.GITHUB_RUN_NUMBER ?? "0", 10);
}

/**
 * Returns the URL of the GitHub server.
 *
 * @returns The GitHub server URL, e.g. `https://github.com`.
 */
export function getGitHubServerUrl(): string {
  return process.env.GITHUB_SERVER_URL ?? "";
}

/**
 * Returns the commit SHA that triggered the workflow.
 *
 * The exact value depends on the triggering event.
 *
 * @returns The triggering commit SHA.
 */
export function getGitHubSha(): string {
  return process.env.GITHUB_SHA ?? "";
}

/**
 * Returns the path to the file used to persist state values from workflow
 * commands.
 *
 * @returns The path to the GitHub state file.
 */
export function getGitHubState(): string {
  return process.env.GITHUB_STATE ?? "";
}

/**
 * Returns the path to the file used to write job summaries from workflow
 * commands.
 *
 * @returns The path to the step summary file.
 */
export function getGitHubStepSummary(): string {
  return process.env.GITHUB_STEP_SUMMARY ?? "";
}

/**
 * Returns the username of the user who initiated the workflow run.
 *
 * May differ from `GITHUB_ACTOR` when the workflow is re-run by a different
 * user.
 *
 * @returns The triggering actor's username.
 */
export function getGitHubTriggeringActor(): string {
  return process.env.GITHUB_TRIGGERING_ACTOR ?? "";
}

/**
 * Returns the name of the workflow.
 *
 * Defaults to the full file path if the workflow file has no `name` field.
 *
 * @returns The workflow name.
 */
export function getGitHubWorkflow(): string {
  return process.env.GITHUB_WORKFLOW ?? "";
}

/**
 * Returns the ref path to the workflow file.
 *
 * @returns The workflow file ref path, e.g.
 *   `owner/repo/.github/workflows/ci.yml@refs/heads/main`.
 */
export function getGitHubWorkflowRef(): string {
  return process.env.GITHUB_WORKFLOW_REF ?? "";
}

/**
 * Returns the commit SHA for the workflow file.
 *
 * @returns The workflow file's commit SHA.
 */
export function getGitHubWorkflowSha(): string {
  return process.env.GITHUB_WORKFLOW_SHA ?? "";
}

/**
 * Returns the default working directory on the runner where the repository
 * is checked out.
 *
 * @returns The workspace path.
 */
export function getGitHubWorkspace(): string {
  return process.env.GITHUB_WORKSPACE ?? "";
}

/**
 * Returns the CPU architecture of the runner executing the job.
 *
 * @returns The runner architecture, e.g. `X86`, `X64`, `ARM`, `ARM64`.
 */
export function getRunnerArch(): string {
  return process.env.RUNNER_ARCH ?? "";
}

/**
 * Returns whether debug logging is enabled for the runner.
 *
 * Only set when debug logging is enabled, with a value of `1`.
 *
 * @returns `true` if debug logging is enabled, `false` otherwise.
 */
export function getRunnerDebug(): boolean {
  return process.env.RUNNER_DEBUG === "1";
}

/**
 * Returns the type of runner executing the job.
 *
 * @returns The runner environment type, either `github-hosted` or `self-hosted`.
 */
export function getRunnerEnvironment(): string {
  return process.env.RUNNER_ENVIRONMENT ?? "";
}

/**
 * Returns the name of the runner executing the job.
 *
 * Names may not be unique across repository and organization levels.
 *
 * @returns The runner name.
 */
export function getRunnerName(): string {
  return process.env.RUNNER_NAME ?? "";
}

/**
 * Returns the operating system of the runner executing the job.
 *
 * @returns The runner OS, e.g. `Linux`, `Windows`, `macOS`.
 */
export function getRunnerOs(): string {
  return process.env.RUNNER_OS ?? "";
}

/**
 * Returns the path to a temporary directory on the runner.
 *
 * This directory is cleared at the start and end of each job.
 *
 * @returns The runner temp directory path.
 */
export function getRunnerTemp(): string {
  return process.env.RUNNER_TEMP ?? "";
}

/**
 * Returns the path to the directory containing preinstalled tools for
 * GitHub-hosted runners.
 *
 * @returns The runner tool cache path.
 */
export function getRunnerToolCache(): string {
  return process.env.RUNNER_TOOL_CACHE ?? "";
}
