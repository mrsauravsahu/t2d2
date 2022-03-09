gentest(
  name="test",
  data=glob(["*"], ["node_modules"]),
  test_cmd="cd svc/create-jest-starter && npm ci && npm t",
  no_test_output=True
)

sh_cmd(
  name = "build",
  srcs = glob(["*"], ["node_modules", "BUILD"]),
  cmd = "echo no build step",
)

sh_cmd(
  name = "bump",
  srcs = glob(["*"], ["node_modules", "BUILD"]),
  cmd = "npm --prefix svc/create-jest-starter update",
)

sh_cmd(
  name = "audit",
  srcs = glob(["*"], ["node_modules", "BUILD"]),
  cmd = "npm --prefix svc/core audit fix",
)
