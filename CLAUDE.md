# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
pnpm tsc        # type-check (no emit)
pnpm eslint .   # lint
pnpm prettier --write .  # format
pnpm test       # run tests with coverage
pnpm test src/io.test.ts  # run a single test file
pnpm prepack    # compile to dist/
```

Pre-commit hooks are managed by [Lefthook](https://lefthook.dev/), set up with `lefthook install`. Hooks automatically run dependency installation, type checking, formatting, linting, and documentation validation before each commit. If formatting or linting modifies any files, the commit is aborted — stage the auto-fixed files and recommit.

## Architecture

`gha-utils` is a zero-runtime-dependency TypeScript library that wraps GitHub Actions' file-based APIs and workflow command syntax. It is published as four subpath exports, each corresponding to a source file.

**Source files and subpath exports** (in `src/`):

- `exec.ts` — wraps Node's `child_process.spawn` in a promise. Each of stdout and stderr accepts an `OutputMode`: `"pipe"` (default, passes output to the current process; stdout also logs the command via `logCommand`), `"capture"` (collects and returns the output as a string), or `"silent"` (suppresses the output). Modes can be set independently per stream.
- `io.ts` — reads inputs from `INPUT_*` env vars and appends key-value pairs to the files pointed to by `GITHUB_OUTPUT`, `GITHUB_STATE`, `GITHUB_ENV`, and `GITHUB_PATH`. Every mutating function has both an async and a sync variant.
- `log.ts` — writes GitHub Actions workflow commands (`::debug::`, `::notice::`, `::warning::`, `::error::`, `::add-mask::`, `::group::`, `::stop-commands::`, etc.) to stdout. `logNotice`, `logWarning`, and `logError` accept an optional `AnnotationOptions` object (`title`, `file`, `line`, `endLine`, `col`, `endColumn`) that is serialized as `key=value,...` between the command name and message.
- `vars.ts` — exposes typed getter functions for every [default GitHub Actions variable](https://docs.github.com/en/actions/reference/workflows-and-actions/variables) (e.g. `getGitHubRepository()`, `getRunnerOs()`). Boolean variables return `boolean`, numeric count/day variables (`getGitHubRetentionDays`, `getGitHubRunAttempt`, `getGitHubRunNumber`) return `number`, and all others (including ID variables) return `string`.

**Testing**: Vitest with 100% coverage enforced. Tests for `log.ts` and `io.ts` spy on `process.stdout.write` and manipulate `process.env` to simulate the GitHub Actions runtime. Tests for `exec.ts` assert on resolve values and mock `logCommand`, but do not spy on process streams (stdout/stderr use `"inherit"` mode at the OS level, bypassing Node.js streams).
