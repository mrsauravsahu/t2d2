sh_cmd(
  name = "build",
  srcs = [],
  cmd = "echo no build step",
)

gentest(
  name = "test",
  data = glob(["*"], ["node_modules"]),
  pass_env = ["SECRET_ARM_CLIENT_ID", "ARM_CLIENT_ID", "ARM_CLIENT_SECRET", "ARM_SUBSCRIPTION_ID", "ARM_TENANT_ID"],
  test_cmd="cd svc/samples-azure-vm && npm ci && npm t",
  no_test_output=True
)

sh_cmd(
  name = "bump",
  srcs = glob(["*"], ["node_modules", "BUILD"]),
  cmd = "npm --prefix svc/samples-azure-vm update",
)

sh_cmd(
  name = "audit",
  srcs = glob(["*"], ["node_modules", "BUILD"]),
  cmd = "npm --prefix svc/samples-azure-vm audit fix || true",
)