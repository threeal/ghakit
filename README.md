# GhaKit

A toolkit for building [GitHub Actions](https://github.com/features/actions). Wraps GitHub Actions' file-based and stdout-based workflow APIs into typed, promise-friendly functions, with no runtime dependencies.

## Installation

```sh
npm install ghakit
```

## Modules

| Import                       | Purpose                                                             |
| ---------------------------- | ------------------------------------------------------------------- |
| [`ghakit/io`](#ghakitio)     | Read inputs; write outputs, state, env vars, and system paths       |
| [`ghakit/log`](#ghakitlog)   | Log messages, mask secrets, group output, control workflow commands |
| [`ghakit/exec`](#ghakitexec) | Spawn child processes with stdout/stderr capture or suppression     |
| [`ghakit/vars`](#ghakitvars) | Typed getters for all default GitHub Actions variables              |

Full API reference: [threeal.github.io/ghakit](https://threeal.github.io/ghakit)

---

## `ghakit/io`

### Reading inputs

```ts
import { getInput } from "ghakit/io";

const token = getInput("token"); // returns "" if the input is not set
```

### Writing outputs

```ts
import { setOutput } from "ghakit/io";

await setOutput("result", "success");
```

A synchronous variant [`setOutputSync`](https://threeal.github.io/ghakit/functions/io.setOutputSync.html) is also available.

### State (pre/post steps)

State persists across the pre, main, and post steps of the same action.

```ts
import { getState, setState } from "ghakit/io";

// In the main step:
await setState("cache-key", key);

// In the post step:
const cachedKey = getState("cache-key");
```

A synchronous variant [`setStateSync`](https://threeal.github.io/ghakit/functions/io.setStateSync.html) is also available.

### Environment variables

Sets the variable in the current process and exports it to subsequent steps.

```ts
import { setEnv } from "ghakit/io";

await setEnv("MY_VAR", "value");
```

A synchronous variant [`setEnvSync`](https://threeal.github.io/ghakit/functions/io.setEnvSync.html) is also available.

### System path

Prepends the path to `PATH` in the current process and exports it to subsequent steps.

```ts
import { addPath } from "ghakit/io";

await addPath("/usr/local/custom/bin");
```

A synchronous variant [`addPathSync`](https://threeal.github.io/ghakit/functions/io.addPathSync.html) is also available.

---

## `ghakit/log`

### Message levels

```ts
import { logDebug, logError, logInfo, logNotice, logWarning } from "ghakit/log";

logInfo("starting task");
logDebug("verbose detail"); // only shown when debug logging is enabled
logNotice("something worth noting");
logWarning("non-fatal issue");
logError("something failed");
```

`logError` accepts `unknown`, matching the type of a caught exception, so it can be passed directly in a `catch` block:

```ts
try {
  // ...
} catch (err) {
  logError(err);
}
```

`logNotice`, `logWarning`, and `logError` accept an optional [`AnnotationOptions`](https://threeal.github.io/ghakit/interfaces/log.AnnotationOptions.html) to pin the message to a file location:

```ts
logError("type mismatch", { file: "src/index.ts", line: 42, col: 5 });
logWarning("deprecated call", {
  title: "Deprecation Warning",
  file: "src/index.ts",
  line: 10,
});
logNotice("review this", { file: "src/index.ts", line: 1 });
```

### Logging commands

Outputs a `[command]` line to mark shell command execution in the workflow log.

```ts
import { logCommand } from "ghakit/log";

logCommand("git", "fetch", "--all"); // renders as [command]git fetch --all
```

### Masking secrets

Any subsequent occurrence of the masked value in the workflow logs is replaced with `***`.

```ts
import { addLogMask } from "ghakit/log";

addLogMask(process.env.MY_SECRET ?? "");
```

### Log groups

All messages logged between `beginLogGroup` and `endLogGroup` are nested inside a collapsible section.

```ts
import { beginLogGroup, endLogGroup, logInfo } from "ghakit/log";

beginLogGroup("build output");
logInfo("compiling...");
endLogGroup();
```

### Stopping workflow command processing

Output between `stopCommands` and `resumeCommands` is not interpreted as workflow commands.

```ts
import { randomUUID } from "node:crypto";
import { resumeCommands, stopCommands } from "ghakit/log";

const token = randomUUID();
stopCommands(token);
// Lines here are printed verbatim
resumeCommands(token);
```

---

## `ghakit/exec`

Runs a command as a child process. By default, passes stdout and stderr to the current process. Rejects with an `Error` if the process fails to spawn, exits with a non-zero code, or is killed by a signal.

```ts
import { exec } from "ghakit/exec";

await exec("git", ["fetch", "--all"]);
```

Set `stdout` or `stderr` to `"silent"` to suppress that stream:

```ts
await exec("git", ["fetch", "--all"], { stderr: "silent" });
```

Set either to `"capture"` to collect and return it as a string:

```ts
const { stdout } = await exec("git", ["rev-parse", "HEAD"], {
  stdout: "capture",
});
```

Both streams can also be captured at once:

```ts
const { stdout, stderr } = await exec("git", ["rev-parse", "HEAD"], {
  stdout: "capture",
  stderr: "capture",
});
```

---

## `ghakit/vars`

Typed getters for every [default GitHub Actions variable](https://docs.github.com/en/actions/reference/workflows-and-actions/variables). Boolean variables return `boolean`, numeric count/day variables return `number`, context-specific variables (only set in certain events or action types) return `string | undefined`, and all others return `string`.

```ts
import {
  getCI,
  getGitHubEventName,
  getGitHubRefName,
  getGitHubRepository,
  getGitHubRunAttempt,
  getGitHubRunId,
  getGitHubRunNumber,
  getGitHubSha,
  getRunnerArch,
  getRunnerDebug,
  getRunnerOs,
} from "ghakit/vars";

const repo = getGitHubRepository(); // "owner/repo"
const sha = getGitHubSha(); // triggering commit SHA
const ref = getGitHubRefName(); // e.g. "main"
const event = getGitHubEventName(); // e.g. "push"
const isCI = getCI(); // boolean
const runId = getGitHubRunId(); // e.g. "1234567890"
const runNumber = getGitHubRunNumber(); // number
const runAttempt = getGitHubRunAttempt(); // number
const os = getRunnerOs(); // "Linux", "Windows", or "macOS"
const arch = getRunnerArch(); // "X64", "ARM64", etc.
const isDebug = getRunnerDebug(); // boolean
```

For the full list of available getters, see the [API reference](https://threeal.github.io/ghakit/modules/vars.html).

---

## License

This project is licensed under the [MIT License](./LICENSE).

Copyright © 2024–2026 [Alfi Maulana](https://github.com/threeal)
