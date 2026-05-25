# GitHub Actions Utilities

A minimalistic utility package for developing [GitHub Actions](https://github.com/features/actions).

## Key Features

- ES Module support
- Getting inputs and setting outputs
- Getting and setting states
- Setting environment variables and appending system paths
- Logging various kinds of messages
- Executing commands as child processes

## Installation

This project is available as an [npm](https://www.npmjs.com/) package under the name [gha-utils](https://www.npmjs.com/package/gha-utils):

```sh
npm install gha-utils
```

## Usage Guide

### Getting Inputs and Setting Outputs

GitHub Actions inputs can be retrieved using the [`getInput`](https://threeal.github.io/gha-utils/functions/getInput.html) function, which returns a trimmed string or an empty string if the input is not specified. GitHub Actions outputs can be set using the [`setOutput`](https://threeal.github.io/gha-utils/functions/setOutput.html) or [`setOutputSync`](https://threeal.github.io/gha-utils/functions/setOutputSync.html) functions:

```ts
import { getInput, setOutput, setOutputSync } from "gha-utils/io";

const input = getInput("input-name");

await setOutput("output-name", "a value");
setOutputSync("another-output-name", "another value");
```

### Getting and Setting States

GitHub Actions states are useful for passing data between the pre, main, and post steps of the same GitHub Action. States can be set using the [`setState`](https://threeal.github.io/gha-utils/functions/setState.html) or [`setStateSync`](https://threeal.github.io/gha-utils/functions/setStateSync.html) functions:

```ts
import { setState, setStateSync } from "gha-utils/io";

await setState("state-name", "a value");
setStateSync("another-state-name", "another value");
```

They can then be retrieved in the current or other steps using the [`getState`](https://threeal.github.io/gha-utils/functions/getState.html) function:

```ts
import { getState } from "gha-utils/io";

const state = getState("state-name");
```

### Setting Environment Variables

Environment variables in GitHub Actions can be set using the [`setEnv`](https://threeal.github.io/gha-utils/functions/setEnv.html) or [`setEnvSync`](https://threeal.github.io/gha-utils/functions/setEnvSync.html) functions, which sets the environment variables in the current step and exports them to the next steps:

```ts
import { setEnv, setEnvSync } from "gha-utils/io";

await setEnv("AN_ENV", "a value");
setEnvSync("ANOTHER_ENV", "another value");
```

### Adding System Paths

System paths in the GitHub Actions environment can be added using the [`addPath`](https://threeal.github.io/gha-utils/functions/addPath.html) or [`addPathSync`](https://threeal.github.io/gha-utils/functions/addPathSync.html) functions, which prepends the given path to the system path. These functions are useful if an action is adding a new executable located in a custom path:

```ts
import { addPath, addPathSync } from "gha-utils/io";

await addPath("path/to/an/executable");
addPathSync("path/to/another/executable");
```

### Accessing GitHub Actions Variables

All [default GitHub Actions variables](https://docs.github.com/en/actions/reference/workflows-and-actions/variables) are available as typed getter functions. Boolean variables return `boolean`, numeric count/day variables return `number`, and all others (including ID variables) return `string`:

```ts
import {
  getCI,
  getGitHubEventName,
  getGitHubRefName,
  getGitHubRefProtected,
  getGitHubRepository,
  getGitHubRunAttempt,
  getGitHubRunId,
  getGitHubRunNumber,
  getGitHubSha,
  getRunnerArch,
  getRunnerDebug,
  getRunnerOs,
} from "gha-utils/vars";

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

### Masking Values in Logs

Sensitive values can be masked using the [`addLogMask`](https://threeal.github.io/gha-utils/functions/addLogMask.html) function. Any subsequent occurrence of the masked value in the workflow logs will be replaced with `***`:

```ts
import { addLogMask } from "gha-utils/log";

addLogMask(process.env.MY_SECRET);
```

### Logging Messages

There are various ways to log messages in GitHub Actions, including [`logInfo`](https://threeal.github.io/gha-utils/functions/logInfo.html) for logging an informational message, [`logDebug`](https://threeal.github.io/gha-utils/functions/logDebug.html) for logging a debug message, [`logNotice`](https://threeal.github.io/gha-utils/functions/logNotice.html) for logging a notice message, [`logWarning`](https://threeal.github.io/gha-utils/functions/logWarning.html) for logging a warning message, [`logError`](https://threeal.github.io/gha-utils/functions/logError.html) for logging an error message, and [`logCommand`](https://threeal.github.io/gha-utils/functions/logCommand.html) for logging a command line message:

```ts
import {
  logCommand,
  logDebug,
  logError,
  logInfo,
  logNotice,
  logWarning,
} from "gha-utils/log";

try {
  logInfo("an information");
  logDebug("a debug");
  logNotice("a notice");
  logWarning("a warning");
  logCommand("command", "arg0", "arg1", "arg2");
} catch (err) {
  logError(err);
}
```

`logNotice`, `logWarning`, and `logError` accept an optional [`AnnotationOptions`](https://threeal.github.io/gha-utils/interfaces/AnnotationOptions.html) object to attach annotation metadata (source file, line number, etc.) to the log entry:

```ts
import { logError, logNotice, logWarning } from "gha-utils/log";

logNotice("something to note", { file: "src/index.ts", line: 42 });
logWarning("deprecated usage", { title: "Deprecation" });
logError("something went wrong", { file: "src/index.ts", line: 5, col: 1 });
```

### Grouping Logs

Logs can be grouped using the [`beginLogGroup`](https://threeal.github.io/gha-utils/functions/beginLogGroup.html) and [`endLogGroup`](https://threeal.github.io/gha-utils/functions/endLogGroup.html) functions. All messages logged between these functions will be displayed as a group within a collapsible section:

```ts
import { beginLogGroup, endLogGroup, logInfo } from "gha-utils/log";

beginLogGroup("a log group");
logInfo("this message is inside a group");
endLogGroup();

logInfo("this message is outside a group");
```

### Stopping and Resuming Workflow Commands

Workflow command processing can be temporarily halted using [`stopCommands`](https://threeal.github.io/gha-utils/functions/stopCommands.html) and then resumed using [`resumeCommands`](https://threeal.github.io/gha-utils/functions/resumeCommands.html). Any output between these calls will not be interpreted as workflow commands:

```ts
import { randomUUID } from "node:crypto";
import { resumeCommands, stopCommands } from "gha-utils/log";

const endToken = randomUUID();
stopCommands(endToken);
// Output here is not interpreted as workflow commands
resumeCommands(endToken);
```

### Executing Commands

The [`exec`](https://threeal.github.io/gha-utils/functions/exec.html) function runs a command as a child process. By default it logs the command via [`logCommand`](https://threeal.github.io/gha-utils/functions/logCommand.html) and pipes stdout and stderr to the current process streams:

```ts
import { exec } from "gha-utils/exec";

await exec("node", ["--version"]);
```

Pass `silent: true` to suppress logging and output piping:

```ts
import { exec } from "gha-utils/exec";

await exec("node", ["--version"], { silent: true });
```

Pass `capture: true` to collect stdout and return it as a string:

```ts
import { exec } from "gha-utils/exec";

const { stdout } = await exec("node", ["--version"], { capture: true });
```

Both options can be combined:

```ts
import { exec } from "gha-utils/exec";

const { stdout } = await exec("node", ["--version"], {
  silent: true,
  capture: true,
});
```

## License

This project is licensed under the terms of the [MIT License](./LICENSE).

Copyright © 2024-2026 [Alfi Maulana](https://github.com/threeal)
