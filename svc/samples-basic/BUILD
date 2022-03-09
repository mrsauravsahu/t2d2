tarball(
  name = 'build',
  srcs = glob(['src/**/*.tf']),
  out = "samples-basic.tar.gz"
)

gentest(
  name = "test",
  data = glob(["*"], ["node_modules"]),
  test_cmd="cd svc/samples-basic && npm ci && npm t",
  no_test_output=True
)
