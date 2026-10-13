# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About This Repository

A TypeScript toolkit for building GitHub Actions, wrapping their file-based and workflow command APIs with no runtime dependencies. Each module in `src/` is published as its own subpath export (`ghakit/<module>`), with no root entry — listed in `package.json`'s `exports` and `typedoc.json`'s `entryPoints`.

## Gotchas

- `lefthook run pre-commit` skips every job when nothing is staged, even ones that ignore the staged file list — pass `--all-files` to run it outside an actual commit.
- The pre-commit hook fixes files in place, and the run fails if any file changes. Report that failure and leave the fixes for the user to review and re-stage before committing again.
- Vitest's 100% coverage threshold applies to the whole run, not per file — a single test file can fail on source that other tests cover, so run the full suite (`pnpm vitest run`).
- `tsconfig.json` is for type checking, tests included; `tsconfig.build.json` only builds the package during `prepack`.
- `.gitignore` ignores every dotfile and dotdir (`.*`) — a new one needs an explicit `!` exception there or it silently won't be tracked.
