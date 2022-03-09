sh_cmd(
  name = "build",
  srcs = [],
  cmd = "echo no build step",
)

gentest(
  name = "test",
  data = glob(["*"], ["node_modules"]),
  test_cmd="cd svc/samples-basic && npm ci && npm t",
  no_test_output=True
)
