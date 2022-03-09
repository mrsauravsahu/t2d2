gentest(
  name="test",
  data=glob(["*"], ["node_modules"]),
  test_cmd="cd svc/core && npm ci && npm t",
  no_test_output=True
)

sh_cmd(
  name = "build",
  srcs = glob(["*"], ["node_modules", "BUILD"]),
  cmd = "npm --prefix svc/core ci && npm --prefix svc/core run build",
)

sh_cmd(
  name = "bump",
  srcs = glob(["*"], ["node_modules", "BUILD"]),
  cmd = "npm --prefix svc/core update",
)
