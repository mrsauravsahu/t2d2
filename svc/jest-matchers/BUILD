gentest(
  name="test",
  data=glob(["*"], ["node_modules"]),
  test_cmd="cd svc/jest-matchers && npm ci && npm t",
  no_test_output=True
)

sh_cmd(
  name = "build",
  srcs = glob(["*"], ["node_modules", "BUILD"]),
  cmd = "npm --prefix svc/jest-matchers ci && npm --prefix svc/jest-matchers run build",
)
