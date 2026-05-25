# GitHub Actions Utilities

A minimalistic utility package for developing [GitHub Actions](https://github.com/features/actions).

## Key Features

- ES Module support
- Getting inputs and setting outputs
- Getting and setting states
- Setting environment variables and appending system paths
- Logging various kinds of messages

## Installation

This project is available as an [npm](https://www.npmjs.com/) package under the name [gha-utils](https://www.npmjs.com/package/gha-utils):

```sh
npm install gha-utils
```

## Usage Guide

### Getting Inputs and Setting Outputs

GitHub Actions inputs can be retrieved using the [`getInput`](https://threeal.github.io/gha-utils/functions/getInput.html) function, which returns a trimmed string or an empty string if the input is not specified. GitHub Actions outputs can be set using the [`setOutput`](https://threeal.github.io/gha-utils/functions/setOutput.html) or [`setOutputSync`](https://threeal.github.io/gha-utils/functions/setOutputSync.html) functions:

```ts
const input = getInput("input-name");

await setOutput("output-name", "a value");
setOutputSync("another-output-name", "another value");
```

### Getting and Setting States

GitHub Actions states are useful for passing data between the pre, main, and post steps of the same GitHub Action. States can be set using the [`setState`](https://threeal.github.io/gha-utils/functions/setState.html) or [`setStateSync`](https://threeal.github.io/gha-utils/functions/setStateSync.html) functions:

```ts
await setState("state-name", "a value");
setStateSync("another-state-name", "another value");
```

They can then be retrieved in the current or other steps using the [`getState`](https://threeal.github.io/gha-utils/functions/getState.html) function:

```ts
const state = getState("state-name");
```

### Setting Environment Variables

Environment variables in GitHub Actions can be set using the [`setEnv`](https://threeal.github.io/gha-utils/functions/setEnv.html) or [`setEnvSync`](https://threeal.github.io/gha-utils/functions/setEnvSync.html) functions, which sets the environment variables in the current step and exports them to the next steps:

```ts
await setEnv("AN_ENV", "a value");
setEnvSync("ANOTHER_ENV", "another value");
```

### Adding System Paths

System paths in the GitHub Actions environment can be added using the [`addPath`](https://threeal.github.io/gha-utils/functions/addPath.html) or [`addPathSync`](https://threeal.github.io/gha-utils/functions/addPathSync.html) functions, which prepends the given path to the system path. These functions are useful if an action is adding a new executable located in a custom path:

```ts
await addPath("path/to/an/executable");
addPathSync("path/to/another/executable");
```

### Accessing GitHub Actions Variables

All [default GitHub Actions variables](https://docs.github.com/en/actions/reference/workflows-and-actions/variables) are available as typed getter functions. Boolean variables return `boolean`, numeric count/day variables return `number`, and all others (including ID variables) return `string`:

```ts
// Context
const repo = getGitHubRepository(); // e.g. "octocat/Hello-World"
const sha = getGitHubSha(); // triggering commit SHA
const refName = getGitHubRefName(); // e.g. "main"
const eventName = getGitHubEventName(); // e.g. "push"
const isCI = getCI(); // true when running in CI
const isProtected = getGitHubRefProtected(); // true if branch is protected

// Run metadata
const runId = getGitHubRunId(); // unique run ID (string)
const runNumber = getGitHubRunNumber(); // sequential run number (number)
const runAttempt = getGitHubRunAttempt(); // attempt count (number)

// Runner info
const os = getRunnerOs(); // "Linux", "Windows", or "macOS"
const arch = getRunnerArch(); // "X64", "ARM64", etc.
const isDebug = getRunnerDebug(); // true if debug logging is enabled
```

### Logging Messages

There are various ways to log messages in GitHub Actions, including [`logInfo`](https://threeal.github.io/gha-utils/functions/logInfo.html) for logging an informational message, [`logDebug`](https://threeal.github.io/gha-utils/functions/logDebug.html) for logging a debug message, [`logWarning`](https://threeal.github.io/gha-utils/functions/logWarning.html) for logging a warning message, [`logError`](https://threeal.github.io/gha-utils/functions/logError.html) for logging an error message, and [`logCommand`](https://threeal.github.io/gha-utils/functions/logCommand.html) for logging a command line message:

```ts
try {
  logInfo("an information");
  logDebug("a debug");
  logWarning("a warning");
  logCommand("command", "arg0", "arg1", "arg2");
} catch (err) {
  logError(err);
}
```

### Grouping Logs

Logs can be grouped using the [`beginLogGroup`](https://threeal.github.io/gha-utils/functions/beginLogGroup.html) and [`endLogGroup`](https://threeal.github.io/gha-utils/functions/endLogGroup.html) functions. All messages logged between these functions will be displayed as a group within a collapsible section:

```ts
beginLogGroup("a log group");
logInfo("this message is inside a group");
endLogGroup();

logInfo("this message is outside a group");
```

## License

This project is licensed under the terms of the [MIT License](./LICENSE).

Copyright © 2024-2026 [Alfi Maulana](https://github.com/threeal)
