# t2d2

Terraform Test Driven Development

## Why?

Testing Terraform code currently requires knowledge of a new set of tools which make crossing the bridge from Application Development to Infrastructure quite difficult.

## How?

T2D2 helps bridge this gap by allowing you write your IaC tests with familiar JavaScript testing frameworks like [Jest](https://jestjs.io/), [Mocha](https://mochajs.org), [UVU](https://github.com/lukeed/uvu) etc.,.

## Getting Started

- Create a starter jest project inside your Terraform workspace

```bash
mkdir tests
cd tests
npm init @mrsauravsahu/t2d2
```

- Start writing your tests.
- TODO (refer [resources.ts](./playground/t2d2-testing/__tests__/resources.ts) for now.)