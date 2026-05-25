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
  vi,
} from "vitest";

import {
  addPath,
  addPathSync,
  getInput,
  getState,
  setEnv,
  setEnvSync,
  setOutput,
  setOutputSync,
  setState,
  setStateSync,
} from "./io.js";
import {
  getGitHubEnv,
  getGitHubOutput,
  getGitHubPath,
  getGitHubState,
} from "./vars.js";

vi.mock("./vars.js");

const tmpDir = resolve(import.meta.dirname, `${import.meta.filename}.tmp`);

beforeAll(() => mkdir(tmpDir, { recursive: true }));

afterAll(() => rm(tmpDir, { recursive: true, force: true }));

beforeEach(() => {
  process.env = {};
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

  beforeAll(() => vi.mocked(getGitHubOutput).mockReturnValue(githubOutput));

  beforeEach(() => rm(githubOutput, { force: true }));

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

  beforeAll(() => vi.mocked(getGitHubState).mockReturnValue(githubState));

  beforeEach(() => rm(githubState, { force: true }));

  test("sets multiple states concurrently", async () => {
    await Promise.all([
      setState("a-state", "a value"),
      setState("another-state", "another value"),
    ]);

    expect(process.env).toStrictEqual({
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

  beforeAll(() => vi.mocked(getGitHubEnv).mockReturnValue(githubEnv));

  beforeEach(() => rm(githubEnv, { force: true }));

  test("sets multiple environment variables concurrently", async () => {
    await Promise.all([
      setEnv("AN_ENV", "a value"),
      setEnv("ANOTHER_ENV", "another value"),
    ]);

    expect(process.env).toStrictEqual({
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
      AN_ENV: "a value",
      ANOTHER_ENV: "another value",
    });

    const content = await readFile(githubEnv, { encoding: "utf-8" });
    expect(content).toBe(`AN_ENV=a value${EOL}ANOTHER_ENV=another value${EOL}`);
  });
});

describe("addPath", () => {
  const githubPath = join(tmpDir, "github_path");

  beforeAll(() => vi.mocked(getGitHubPath).mockReturnValue(githubPath));

  beforeEach(() => rm(githubPath, { force: true }));

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
