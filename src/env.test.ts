import { mkdir, readFile, rm } from "node:fs/promises";
import { EOL } from "node:os";
import { delimiter, join, resolve } from "node:path";
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from "vitest";

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

const tmpDir = resolve(import.meta.dirname, `${import.meta.filename}.tmp`);

beforeAll(() => mkdir(tmpDir, { recursive: true }));

afterAll(() => rm(tmpDir, { recursive: true, force: true }));

beforeEach(() => {
  process.env = {};
});

describe("mustGetEnvironment", () => {
  test("retrieves an environment variable", () => {
    process.env.AN_ENV = "a value";
    expect(mustGetEnvironment("AN_ENV")).toBe("a value");
  });

  test("throws on undefined environment variable", () => {
    expect(() => mustGetEnvironment("AN_UNDEFINED_ENV")).toThrow(
      "the AN_UNDEFINED_ENV environment variable must be defined",
    );
  });
});

describe("getInput", () => {
  test("retrieves a GitHub Actions input", () => {
    process.env["INPUT_AN-INPUT"] = " a value  ";
    expect(getInput("an-input")).toBe("a value");
  });

  test("returns empty string for undefined input", () => {
    expect(getInput("an-undefined-input")).toBe("");
  });
});

describe("getState", () => {
  test("retrieves a GitHub Actions state", () => {
    process.env["STATE_a-state"] = " a value  ";
    expect(getState("a-state")).toBe("a value");
  });

  test("returns empty string for undefined state", () => {
    expect(getState("an-undefined-state")).toBe("");
  });
});

describe("setOutput", () => {
  const githubOutput = join(tmpDir, "github_output");

  beforeEach(async () => {
    await rm(githubOutput, { force: true });
    process.env.GITHUB_OUTPUT = githubOutput;
  });

  test("sets multiple outputs concurrently", async () => {
    await Promise.all([
      setOutput("an-output", "a value"),
      setOutput("another-output", "another value"),
    ]);

    const content = await readFile(githubOutput, { encoding: "utf-8" });
    expect(content.split(EOL).sort()).toStrictEqual([
      "",
      "an-output=a value",
      "another-output=another value",
    ]);
  });

  test("sets outputs synchronously", async () => {
    setOutputSync("an-output", "a value");
    setOutputSync("another-output", "another value");

    const content = await readFile(githubOutput, { encoding: "utf-8" });
    expect(content).toBe(
      `an-output=a value${EOL}another-output=another value${EOL}`,
    );
  });
});

describe("setState", () => {
  const githubState = join(tmpDir, "github_state");

  beforeEach(async () => {
    await rm(githubState, { force: true });
    process.env.GITHUB_STATE = githubState;
  });

  test("sets multiple states concurrently", async () => {
    await Promise.all([
      setState("a-state", "a value"),
      setState("another-state", "another value"),
    ]);

    expect(process.env).toStrictEqual({
      GITHUB_STATE: githubState,
      "STATE_a-state": "a value",
      "STATE_another-state": "another value",
    });

    const content = await readFile(githubState, { encoding: "utf-8" });
    expect(content.split(EOL).sort()).toStrictEqual([
      "",
      "a-state=a value",
      "another-state=another value",
    ]);
  });

  test("sets states synchronously", async () => {
    setStateSync("a-state", "a value");
    setStateSync("another-state", "another value");

    expect(process.env).toStrictEqual({
      GITHUB_STATE: githubState,
      "STATE_a-state": "a value",
      "STATE_another-state": "another value",
    });

    const content = await readFile(githubState, { encoding: "utf-8" });
    expect(content).toBe(
      `a-state=a value${EOL}another-state=another value${EOL}`,
    );
  });
});

describe("setEnv", () => {
  const githubEnv = join(tmpDir, "github_env");

  beforeEach(async () => {
    await rm(githubEnv, { force: true });
    process.env.GITHUB_ENV = githubEnv;
  });

  test("sets multiple environment variables concurrently", async () => {
    await Promise.all([
      setEnv("AN_ENV", "a value"),
      setEnv("ANOTHER_ENV", "another value"),
    ]);

    expect(process.env).toStrictEqual({
      GITHUB_ENV: githubEnv,
      AN_ENV: "a value",
      ANOTHER_ENV: "another value",
    });

    const content = await readFile(githubEnv, { encoding: "utf-8" });
    expect(content.split(EOL).sort()).toStrictEqual([
      "",
      "ANOTHER_ENV=another value",
      "AN_ENV=a value",
    ]);
  });

  test("sets environment variables synchronously", async () => {
    setEnvSync("AN_ENV", "a value");
    setEnvSync("ANOTHER_ENV", "another value");

    expect(process.env).toStrictEqual({
      GITHUB_ENV: githubEnv,
      AN_ENV: "a value",
      ANOTHER_ENV: "another value",
    });

    const content = await readFile(githubEnv, { encoding: "utf-8" });
    expect(content).toBe(`AN_ENV=a value${EOL}ANOTHER_ENV=another value${EOL}`);
  });
});

describe("addPath", () => {
  const githubPath = join(tmpDir, "github_path");

  beforeEach(async () => {
    await rm(githubPath, { force: true });
    process.env.GITHUB_PATH = githubPath;
  });

  test("adds multiple paths concurrently", async () => {
    await Promise.all([addPath("a-path"), addPath("another-path")]);

    expect(process.env.PATH).toBe(`another-path${delimiter}a-path`);

    const content = await readFile(githubPath, { encoding: "utf-8" });
    expect(content.split(EOL).sort()).toStrictEqual([
      "",
      "a-path",
      "another-path",
    ]);
  });

  test("adds paths synchronously", async () => {
    addPathSync("a-path");
    addPathSync("another-path");

    expect(process.env.PATH).toBe(`another-path${delimiter}a-path`);

    const content = await readFile(githubPath, { encoding: "utf-8" });
    expect(content).toBe(`a-path${EOL}another-path${EOL}`);
  });
});
