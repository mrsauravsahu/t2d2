sh_cmd(
  name = 'test',
  srcs = glob(['*'], ['node_modules', 'BUILD']),
  cmd = 'npm --prefix svc/create-jest-starter ci && npm --prefix svc/create-jest-starter t',
)

sh_cmd(
  name = 'build',
  srcs = glob(['*'], ['node_modules', 'BUILD']),
  cmd = 'echo done',
)
