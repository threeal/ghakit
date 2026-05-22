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
- `log.ts` — writes GitHub Actions workflow commands (`::debug::`, `::warning::`, `::error::`, `::group::`, etc.) to stdout.

**Testing**: Vitest with 100% coverage enforced. Tests spy on `process.stdout.write` and manipulate `process.env` to simulate the GitHub Actions runtime.
