# t2d2

Terraform Test Driven Development

## Why?

Testing Terraform code currently requires knowledge of a new set of tools which make crossing the bridge from Application Development to Infrastructure quite difficult.

## How?

t2d2 helps bridge this gap by allowing you write your IaC tests with familiar JavaScript testing frameworks like [Jest](https://jestjs.io/), [Mocha](https://mochajs.org), [UVU](https://github.com/lukeed/uvu) etc.,.

## Getting Started

1. Create a starter jest project.
You can explore the sample test in [resources.ts](srv/test-template/__tests__/resources.ts)

```bash
mkdir my-infra-project
cd my-infra-project
npm init @t2d2/jest-starter
```

2. Customize the terraform workspace path in your tests' `beforeAll` hook, if required.

```typescript
...

profile = await t2d2.init({
  profileName: 'resources',
  workspaceDir: './tf', # <--
})

...
```

3. Start your TDD cycles.

# Packages

## @t2d2/core

Main package in the t2d2 Suite, helps with:
- Setting up the Terraform workspace through code
- Functions to write unit tests

## @t2d2/create-jest-starter

npm init package to setup a jest test project with t2d2

## @t2d2/jest-matchers

t2d2 core test helpers, supercharged as jest custom matchers

