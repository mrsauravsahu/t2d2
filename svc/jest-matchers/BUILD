sh_cmd(
  name = 'test',
  srcs = glob(['*'], ['node_modules', 'BUILD']),
  cmd = 'npm --prefix svc/jest-matchers ci && npm --prefix svc/jest-matchers t',
)

sh_cmd(
  name = 'build',
  srcs = glob(['*'], ['node_modules', 'BUILD']),
  cmd = 'npm --prefix svc/jest-matchers ci && npm --prefix svc/jest-matchers run build',
)
