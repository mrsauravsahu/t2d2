sh_cmd(
  name = 'test',
  srcs = glob(['*'], ['node_modules', 'BUILD']),
  cmd = 'npm --prefix svc/core ci && npm --prefix svc/core t',
)

sh_cmd(
  name = 'build',
  srcs = glob(['*'], ['node_modules', 'BUILD']),
  cmd = 'npm --prefix svc/core ci && npm --prefix svc/core run build',
)
