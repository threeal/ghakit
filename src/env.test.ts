import { readFile, rm } from "node:fs/promises";
import { EOL, tmpdir } from "node:os";
import { delimiter, join } from "node:path";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import {
  addPath,
  addPathSync,
  getInput,
  getState,
  mustGetEnvironment,
  setEnv,
  setEnvSync,
  setOutput,
  setOutputSync,
  setState,
  setStateSync,
} from "./env.js";

describe("mustGetEnvironment", () => {
  afterEach(() => vi.unstubAllEnvs());

  test("retrieves an environment variable", () => {
    vi.stubEnv("AN_ENV", "a value");
    expect(mustGetEnvironment("AN_ENV")).toBe("a value");
  });

  test("throws on undefined environment variable", () => {
    expect(() => mustGetEnvironment("AN_UNDEFINED_ENV")).toThrow(
      "the AN_UNDEFINED_ENV environment variable must be defined",
    );
  });
});

describe("getInput", () => {
  afterEach(() => vi.unstubAllEnvs());

  test("retrieves a GitHub Actions input", () => {
    vi.stubEnv("INPUT_AN-INPUT", " a value  ");
    expect(getInput("an-input")).toBe("a value");
  });

  test("returns empty string for undefined input", () => {
    expect(getInput("an-undefined-input")).toBe("");
  });
});

describe("getState", () => {
  afterEach(() => vi.unstubAllEnvs());

  test("retrieves a GitHub Actions state", () => {
    vi.stubEnv("STATE_a-state", " a value  ");
    expect(getState("a-state")).toBe("a value");
  });

  test("returns empty string for undefined state", () => {
    expect(getState("an-undefined-state")).toBe("");
  });
});

describe("setOutput", () => {
  const githubOutputFile = join(tmpdir(), "github_output");
  let savedEnv: NodeJS.ProcessEnv;

  beforeEach(async () => {
    savedEnv = process.env;
    process.env = { GITHUB_OUTPUT: githubOutputFile };
    await rm(githubOutputFile, { force: true });
  });

  afterEach(async () => {
    process.env = savedEnv;
    await rm(githubOutputFile, { force: true });
  });

  test("sets multiple outputs concurrently", async () => {
    await Promise.all([
      setOutput("an-output", "a value"),
      setOutput("another-output", "another value"),
    ]);

    const content = await readFile(githubOutputFile, {
      encoding: "utf-8",
    });
    const lines = content
      .split(EOL)
      .filter((line) => line !== "")
      .sort();

    expect(lines).toEqual([
      "an-output=a value",
      "another-output=another value",
    ]);
  });

  test("sets outputs synchronously", async () => {
    setOutputSync("an-output", "a value");
    setOutputSync("another-output", "another value");

    const content = await readFile(githubOutputFile, {
      encoding: "utf-8",
    });

    expect(content).toBe(
      `an-output=a value${EOL}another-output=another value${EOL}`,
    );
  });
});

describe("setState", () => {
  const githubStateFile = join(tmpdir(), "github_state");
  let savedEnv: NodeJS.ProcessEnv;

  beforeEach(async () => {
    savedEnv = process.env;
    process.env = { GITHUB_STATE: githubStateFile };
    await rm(githubStateFile, { force: true });
  });

  afterEach(async () => {
    process.env = savedEnv;
    await rm(githubStateFile, { force: true });
  });

  test("sets multiple states concurrently", async () => {
    await Promise.all([
      setState("a-state", "a value"),
      setState("another-state", "another value"),
    ]);

    expect(process.env).toEqual({
      GITHUB_STATE: githubStateFile,
      "STATE_a-state": "a value",
      "STATE_another-state": "another value",
    });

    const content = await readFile(githubStateFile, {
      encoding: "utf-8",
    });
    const lines = content
      .split(EOL)
      .filter((line) => line !== "")
      .sort();

    expect(lines).toEqual(["a-state=a value", "another-state=another value"]);
  });

  test("sets states synchronously", async () => {
    setStateSync("a-state", "a value");
    setStateSync("another-state", "another value");

    expect(process.env).toEqual({
      GITHUB_STATE: githubStateFile,
      "STATE_a-state": "a value",
      "STATE_another-state": "another value",
    });

    const content = await readFile(githubStateFile, {
      encoding: "utf-8",
    });

    expect(content).toBe(
      `a-state=a value${EOL}another-state=another value${EOL}`,
    );
  });
});

describe("setEnv", () => {
  const githubEnvFile = join(tmpdir(), "github_env");
  let savedEnv: NodeJS.ProcessEnv;

  beforeEach(async () => {
    savedEnv = process.env;
    process.env = { GITHUB_ENV: githubEnvFile };
    await rm(githubEnvFile, { force: true });
  });

  afterEach(async () => {
    process.env = savedEnv;
    await rm(githubEnvFile, { force: true });
  });

  test("sets multiple environment variables concurrently", async () => {
    await Promise.all([
      setEnv("AN_ENV", "a value"),
      setEnv("ANOTHER_ENV", "another value"),
    ]);

    expect(process.env).toEqual({
      GITHUB_ENV: githubEnvFile,
      AN_ENV: "a value",
      ANOTHER_ENV: "another value",
    });

    const content = await readFile(githubEnvFile, {
      encoding: "utf-8",
    });
    const lines = content
      .split(EOL)
      .filter((line) => line !== "")
      .sort();

    expect(lines).toEqual(["ANOTHER_ENV=another value", "AN_ENV=a value"]);
  });

  test("sets environment variables synchronously", async () => {
    setEnvSync("AN_ENV", "a value");
    setEnvSync("ANOTHER_ENV", "another value");

    expect(process.env).toEqual({
      GITHUB_ENV: githubEnvFile,
      AN_ENV: "a value",
      ANOTHER_ENV: "another value",
    });

    const content = await readFile(githubEnvFile, {
      encoding: "utf-8",
    });

    expect(content).toBe(`AN_ENV=a value${EOL}ANOTHER_ENV=another value${EOL}`);
  });
});

describe("addPath", () => {
  const githubPathFile = join(tmpdir(), "github_path");
  let savedEnv: NodeJS.ProcessEnv;

  beforeEach(async () => {
    savedEnv = process.env;
    process.env = { GITHUB_PATH: githubPathFile };
    await rm(githubPathFile, { force: true });
  });

  afterEach(async () => {
    process.env = savedEnv;
    await rm(githubPathFile, { force: true });
  });

  test("adds multiple paths concurrently", async () => {
    await Promise.all([addPath("a-path"), addPath("another-path")]);

    const sysPaths = (process.env.PATH ?? "").split(delimiter).sort();
    expect(sysPaths).toEqual(["a-path", "another-path"]);

    const content = await readFile(githubPathFile, {
      encoding: "utf-8",
    });
    const lines = content
      .split(EOL)
      .filter((line) => line !== "")
      .sort();

    expect(lines).toEqual(["a-path", "another-path"]);
  });

  test("adds paths synchronously", async () => {
    addPathSync("a-path");
    addPathSync("another-path");

    const sysPaths = (process.env.PATH ?? "").split(delimiter);
    expect(sysPaths).toEqual(["another-path", "a-path"]);

    const content = await readFile(githubPathFile, {
      encoding: "utf-8",
    });

    expect(content).toBe(`a-path${EOL}another-path${EOL}`);
  });
});
