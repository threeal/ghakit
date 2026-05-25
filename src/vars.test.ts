import { beforeEach, describe, expect, test } from "vitest";

import {
  getCI,
  getGitHubAction,
  getGitHubActionPath,
  getGitHubActionRepository,
  getGitHubActions,
  getGitHubActor,
  getGitHubActorId,
  getGitHubApiUrl,
  getGitHubBaseRef,
  getGitHubEnv,
  getGitHubEventName,
  getGitHubEventPath,
  getGitHubGraphqlUrl,
  getGitHubHeadRef,
  getGitHubJob,
  getGitHubOutput,
  getGitHubPath,
  getGitHubRef,
  getGitHubRefName,
  getGitHubRefProtected,
  getGitHubRefType,
  getGitHubRepository,
  getGitHubRepositoryId,
  getGitHubRepositoryOwner,
  getGitHubRepositoryOwnerId,
  getGitHubRetentionDays,
  getGitHubRunAttempt,
  getGitHubRunId,
  getGitHubRunNumber,
  getGitHubServerUrl,
  getGitHubSha,
  getGitHubState,
  getGitHubStepSummary,
  getGitHubTriggeringActor,
  getGitHubWorkflow,
  getGitHubWorkflowRef,
  getGitHubWorkflowSha,
  getGitHubWorkspace,
  getRunnerArch,
  getRunnerDebug,
  getRunnerEnvironment,
  getRunnerName,
  getRunnerOs,
  getRunnerTemp,
  getRunnerToolCache,
} from "./vars.js";

beforeEach(() => {
  process.env = {};
});

describe("getCI", () => {
  test("returns true when CI is set", () => {
    process.env.CI = "true";
    expect(getCI()).toBe(true);
  });

  test("returns false when CI is not set", () => {
    expect(getCI()).toBe(false);
  });
});

describe("getGitHubAction", () => {
  test("returns the action name", () => {
    process.env.GITHUB_ACTION = "__run";
    expect(getGitHubAction()).toBe("__run");
  });

  test("returns empty string when not set", () => {
    expect(getGitHubAction()).toBe("");
  });
});

describe("getGitHubActionPath", () => {
  test("returns the action path", () => {
    process.env.GITHUB_ACTION_PATH = "/home/runner/work/_actions/my-action";
    expect(getGitHubActionPath()).toBe("/home/runner/work/_actions/my-action");
  });

  test("returns undefined when not set", () => {
    expect(getGitHubActionPath()).toBeUndefined();
  });
});

describe("getGitHubActionRepository", () => {
  test("returns the action repository", () => {
    process.env.GITHUB_ACTION_REPOSITORY = "actions/checkout";
    expect(getGitHubActionRepository()).toBe("actions/checkout");
  });

  test("returns undefined when not set", () => {
    expect(getGitHubActionRepository()).toBeUndefined();
  });
});

describe("getGitHubActions", () => {
  test("returns true when GITHUB_ACTIONS is set", () => {
    process.env.GITHUB_ACTIONS = "true";
    expect(getGitHubActions()).toBe(true);
  });

  test("returns false when GITHUB_ACTIONS is not set", () => {
    expect(getGitHubActions()).toBe(false);
  });
});

describe("getGitHubActor", () => {
  test("returns the actor username", () => {
    process.env.GITHUB_ACTOR = "octocat";
    expect(getGitHubActor()).toBe("octocat");
  });

  test("returns empty string when not set", () => {
    expect(getGitHubActor()).toBe("");
  });
});

describe("getGitHubActorId", () => {
  test("returns the actor ID", () => {
    process.env.GITHUB_ACTOR_ID = "1234567";
    expect(getGitHubActorId()).toBe("1234567");
  });

  test("returns empty string when not set", () => {
    expect(getGitHubActorId()).toBe("");
  });
});

describe("getGitHubApiUrl", () => {
  test("returns the API URL", () => {
    process.env.GITHUB_API_URL = "https://api.github.com";
    expect(getGitHubApiUrl()).toBe("https://api.github.com");
  });

  test("returns empty string when not set", () => {
    expect(getGitHubApiUrl()).toBe("");
  });
});

describe("getGitHubBaseRef", () => {
  test("returns the base ref", () => {
    process.env.GITHUB_BASE_REF = "main";
    expect(getGitHubBaseRef()).toBe("main");
  });

  test("returns undefined when not set", () => {
    expect(getGitHubBaseRef()).toBeUndefined();
  });
});

describe("getGitHubEnv", () => {
  test("returns the env file path", () => {
    process.env.GITHUB_ENV = "/tmp/github_env";
    expect(getGitHubEnv()).toBe("/tmp/github_env");
  });

  test("returns empty string when not set", () => {
    expect(getGitHubEnv()).toBe("");
  });
});

describe("getGitHubEventName", () => {
  test("returns the event name", () => {
    process.env.GITHUB_EVENT_NAME = "push";
    expect(getGitHubEventName()).toBe("push");
  });

  test("returns empty string when not set", () => {
    expect(getGitHubEventName()).toBe("");
  });
});

describe("getGitHubEventPath", () => {
  test("returns the event payload path", () => {
    process.env.GITHUB_EVENT_PATH = "/tmp/github_event.json";
    expect(getGitHubEventPath()).toBe("/tmp/github_event.json");
  });

  test("returns empty string when not set", () => {
    expect(getGitHubEventPath()).toBe("");
  });
});

describe("getGitHubGraphqlUrl", () => {
  test("returns the GraphQL URL", () => {
    process.env.GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";
    expect(getGitHubGraphqlUrl()).toBe("https://api.github.com/graphql");
  });

  test("returns empty string when not set", () => {
    expect(getGitHubGraphqlUrl()).toBe("");
  });
});

describe("getGitHubHeadRef", () => {
  test("returns the head ref", () => {
    process.env.GITHUB_HEAD_REF = "feature-branch";
    expect(getGitHubHeadRef()).toBe("feature-branch");
  });

  test("returns undefined when not set", () => {
    expect(getGitHubHeadRef()).toBeUndefined();
  });
});

describe("getGitHubJob", () => {
  test("returns the job ID", () => {
    process.env.GITHUB_JOB = "build";
    expect(getGitHubJob()).toBe("build");
  });

  test("returns empty string when not set", () => {
    expect(getGitHubJob()).toBe("");
  });
});

describe("getGitHubOutput", () => {
  test("returns the output file path", () => {
    process.env.GITHUB_OUTPUT = "/tmp/github_output";
    expect(getGitHubOutput()).toBe("/tmp/github_output");
  });

  test("returns empty string when not set", () => {
    expect(getGitHubOutput()).toBe("");
  });
});

describe("getGitHubPath", () => {
  test("returns the path file path", () => {
    process.env.GITHUB_PATH = "/tmp/github_path";
    expect(getGitHubPath()).toBe("/tmp/github_path");
  });

  test("returns empty string when not set", () => {
    expect(getGitHubPath()).toBe("");
  });
});

describe("getGitHubRef", () => {
  test("returns the full ref", () => {
    process.env.GITHUB_REF = "refs/heads/main";
    expect(getGitHubRef()).toBe("refs/heads/main");
  });

  test("returns empty string when not set", () => {
    expect(getGitHubRef()).toBe("");
  });
});

describe("getGitHubRefName", () => {
  test("returns the short ref name", () => {
    process.env.GITHUB_REF_NAME = "main";
    expect(getGitHubRefName()).toBe("main");
  });

  test("returns empty string when not set", () => {
    expect(getGitHubRefName()).toBe("");
  });
});

describe("getGitHubRefProtected", () => {
  test("returns true when ref is protected", () => {
    process.env.GITHUB_REF_PROTECTED = "true";
    expect(getGitHubRefProtected()).toBe(true);
  });

  test("returns false when not set", () => {
    expect(getGitHubRefProtected()).toBe(false);
  });
});

describe("getGitHubRefType", () => {
  test("returns the ref type", () => {
    process.env.GITHUB_REF_TYPE = "branch";
    expect(getGitHubRefType()).toBe("branch");
  });

  test("returns empty string when not set", () => {
    expect(getGitHubRefType()).toBe("");
  });
});

describe("getGitHubRepository", () => {
  test("returns the repository", () => {
    process.env.GITHUB_REPOSITORY = "octocat/Hello-World";
    expect(getGitHubRepository()).toBe("octocat/Hello-World");
  });

  test("returns empty string when not set", () => {
    expect(getGitHubRepository()).toBe("");
  });
});

describe("getGitHubRepositoryId", () => {
  test("returns the repository ID", () => {
    process.env.GITHUB_REPOSITORY_ID = "12345678";
    expect(getGitHubRepositoryId()).toBe("12345678");
  });

  test("returns empty string when not set", () => {
    expect(getGitHubRepositoryId()).toBe("");
  });
});

describe("getGitHubRepositoryOwner", () => {
  test("returns the repository owner", () => {
    process.env.GITHUB_REPOSITORY_OWNER = "octocat";
    expect(getGitHubRepositoryOwner()).toBe("octocat");
  });

  test("returns empty string when not set", () => {
    expect(getGitHubRepositoryOwner()).toBe("");
  });
});

describe("getGitHubRepositoryOwnerId", () => {
  test("returns the repository owner ID", () => {
    process.env.GITHUB_REPOSITORY_OWNER_ID = "9999999";
    expect(getGitHubRepositoryOwnerId()).toBe("9999999");
  });

  test("returns empty string when not set", () => {
    expect(getGitHubRepositoryOwnerId()).toBe("");
  });
});

describe("getGitHubRetentionDays", () => {
  test("returns the retention days", () => {
    process.env.GITHUB_RETENTION_DAYS = "90";
    expect(getGitHubRetentionDays()).toBe(90);
  });

  test("returns 0 when not set", () => {
    expect(getGitHubRetentionDays()).toBe(0);
  });
});

describe("getGitHubRunAttempt", () => {
  test("returns the run attempt number", () => {
    process.env.GITHUB_RUN_ATTEMPT = "2";
    expect(getGitHubRunAttempt()).toBe(2);
  });

  test("returns 0 when not set", () => {
    expect(getGitHubRunAttempt()).toBe(0);
  });
});

describe("getGitHubRunId", () => {
  test("returns the run ID", () => {
    process.env.GITHUB_RUN_ID = "987654321";
    expect(getGitHubRunId()).toBe("987654321");
  });

  test("returns empty string when not set", () => {
    expect(getGitHubRunId()).toBe("");
  });
});

describe("getGitHubRunNumber", () => {
  test("returns the run number", () => {
    process.env.GITHUB_RUN_NUMBER = "42";
    expect(getGitHubRunNumber()).toBe(42);
  });

  test("returns 0 when not set", () => {
    expect(getGitHubRunNumber()).toBe(0);
  });
});

describe("getGitHubServerUrl", () => {
  test("returns the server URL", () => {
    process.env.GITHUB_SERVER_URL = "https://github.com";
    expect(getGitHubServerUrl()).toBe("https://github.com");
  });

  test("returns empty string when not set", () => {
    expect(getGitHubServerUrl()).toBe("");
  });
});

describe("getGitHubSha", () => {
  test("returns the commit SHA", () => {
    process.env.GITHUB_SHA = "abc123def456";
    expect(getGitHubSha()).toBe("abc123def456");
  });

  test("returns empty string when not set", () => {
    expect(getGitHubSha()).toBe("");
  });
});

describe("getGitHubState", () => {
  test("returns the state file path", () => {
    process.env.GITHUB_STATE = "/tmp/github_state";
    expect(getGitHubState()).toBe("/tmp/github_state");
  });

  test("returns empty string when not set", () => {
    expect(getGitHubState()).toBe("");
  });
});

describe("getGitHubStepSummary", () => {
  test("returns the step summary file path", () => {
    process.env.GITHUB_STEP_SUMMARY = "/tmp/github_step_summary";
    expect(getGitHubStepSummary()).toBe("/tmp/github_step_summary");
  });

  test("returns empty string when not set", () => {
    expect(getGitHubStepSummary()).toBe("");
  });
});

describe("getGitHubTriggeringActor", () => {
  test("returns the triggering actor", () => {
    process.env.GITHUB_TRIGGERING_ACTOR = "octocat";
    expect(getGitHubTriggeringActor()).toBe("octocat");
  });

  test("returns empty string when not set", () => {
    expect(getGitHubTriggeringActor()).toBe("");
  });
});

describe("getGitHubWorkflow", () => {
  test("returns the workflow name", () => {
    process.env.GITHUB_WORKFLOW = "CI";
    expect(getGitHubWorkflow()).toBe("CI");
  });

  test("returns empty string when not set", () => {
    expect(getGitHubWorkflow()).toBe("");
  });
});

describe("getGitHubWorkflowRef", () => {
  test("returns the workflow ref path", () => {
    process.env.GITHUB_WORKFLOW_REF =
      "octocat/hello-world/.github/workflows/ci.yml@refs/heads/main";
    expect(getGitHubWorkflowRef()).toBe(
      "octocat/hello-world/.github/workflows/ci.yml@refs/heads/main",
    );
  });

  test("returns empty string when not set", () => {
    expect(getGitHubWorkflowRef()).toBe("");
  });
});

describe("getGitHubWorkflowSha", () => {
  test("returns the workflow file SHA", () => {
    process.env.GITHUB_WORKFLOW_SHA = "deadbeef";
    expect(getGitHubWorkflowSha()).toBe("deadbeef");
  });

  test("returns empty string when not set", () => {
    expect(getGitHubWorkflowSha()).toBe("");
  });
});

describe("getGitHubWorkspace", () => {
  test("returns the workspace path", () => {
    process.env.GITHUB_WORKSPACE = "/home/runner/work/my-repo/my-repo";
    expect(getGitHubWorkspace()).toBe("/home/runner/work/my-repo/my-repo");
  });

  test("returns empty string when not set", () => {
    expect(getGitHubWorkspace()).toBe("");
  });
});

describe("getRunnerArch", () => {
  test("returns the runner architecture", () => {
    process.env.RUNNER_ARCH = "X64";
    expect(getRunnerArch()).toBe("X64");
  });

  test("returns empty string when not set", () => {
    expect(getRunnerArch()).toBe("");
  });
});

describe("getRunnerDebug", () => {
  test("returns true when debug logging is enabled", () => {
    process.env.RUNNER_DEBUG = "1";
    expect(getRunnerDebug()).toBe(true);
  });

  test("returns false when not set", () => {
    expect(getRunnerDebug()).toBe(false);
  });
});

describe("getRunnerEnvironment", () => {
  test("returns the runner environment", () => {
    process.env.RUNNER_ENVIRONMENT = "github-hosted";
    expect(getRunnerEnvironment()).toBe("github-hosted");
  });

  test("returns empty string when not set", () => {
    expect(getRunnerEnvironment()).toBe("");
  });
});

describe("getRunnerName", () => {
  test("returns the runner name", () => {
    process.env.RUNNER_NAME = "ubuntu-latest";
    expect(getRunnerName()).toBe("ubuntu-latest");
  });

  test("returns empty string when not set", () => {
    expect(getRunnerName()).toBe("");
  });
});

describe("getRunnerOs", () => {
  test("returns the runner OS", () => {
    process.env.RUNNER_OS = "Linux";
    expect(getRunnerOs()).toBe("Linux");
  });

  test("returns empty string when not set", () => {
    expect(getRunnerOs()).toBe("");
  });
});

describe("getRunnerTemp", () => {
  test("returns the runner temp path", () => {
    process.env.RUNNER_TEMP = "/tmp";
    expect(getRunnerTemp()).toBe("/tmp");
  });

  test("returns empty string when not set", () => {
    expect(getRunnerTemp()).toBe("");
  });
});

describe("getRunnerToolCache", () => {
  test("returns the runner tool cache path", () => {
    process.env.RUNNER_TOOL_CACHE = "/opt/hostedtoolcache";
    expect(getRunnerToolCache()).toBe("/opt/hostedtoolcache");
  });

  test("returns empty string when not set", () => {
    expect(getRunnerToolCache()).toBe("");
  });
});
