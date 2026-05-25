# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
pnpm tsc        # type-check (no emit)
pnpm eslint .   # lint
pnpm prettier --write .  # format
pnpm test       # run tests with coverage
pnpm test src/env.test.ts  # run a single test file
pnpm prepack    # compile to dist/
```

Pre-commit hooks are managed by [Lefthook](https://lefthook.dev/), set up with `lefthook install`. Hooks automatically run dependency installation, type checking, formatting, linting, and documentation validation before each commit. If formatting or linting modifies any files, the commit is aborted — stage the auto-fixed files and recommit.

## Architecture

`gha-utils` is a zero-runtime-dependency TypeScript library that wraps GitHub Actions' file-based APIs and workflow command syntax.

**Source files** (in `src/`):

- `env.ts` — reads inputs from `INPUT_*` env vars and appends key-value pairs to the files pointed to by `GITHUB_OUTPUT`, `GITHUB_STATE`, `GITHUB_ENV`, and `GITHUB_PATH`. Every mutating function has both an async and a sync variant.
- `exec.ts` — wraps Node's `child_process.spawn` in a promise. Logs the command via `logCommand` and pipes stdout/stderr by default. Supports `silent` (suppress logging and piping) and `capture` (collect stdout and return it as a string) options.
- `log.ts` — writes GitHub Actions workflow commands (`::debug::`, `::warning::`, `::error::`, `::add-mask::`, `::group::`, `::stop-commands::`, etc.) to stdout.
- `vars.ts` — exposes typed getter functions for every [default GitHub Actions variable](https://docs.github.com/en/actions/reference/workflows-and-actions/variables) (e.g. `getGitHubRepository()`, `getRunnerOs()`). Boolean variables return `boolean`, numeric count/day variables (`getGitHubRetentionDays`, `getGitHubRunAttempt`, `getGitHubRunNumber`) return `number`, and all others (including ID variables) return `string`.

**Testing**: Vitest with 100% coverage enforced. Tests spy on `process.stdout.write` and manipulate `process.env` to simulate the GitHub Actions runtime.
