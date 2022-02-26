import { ParsedTFPlan } from "@t2d2/core";

const toHaveRootModuleResourceOfType = (plan: ParsedTFPlan, type: string): jest.CustomMatcherResult => {
  try {
    plan.hasRootModuleResourceOfType(type)
    return { pass: true, message: () => `The plan does contains a resource of type '${type}' at the root module.` }
  }
  catch (error) {
    return { pass: false, message: () => (error as Error).message }
  }
}

export const registerJestMatchers = () => {
  expect.extend({ toHaveRootModuleResourceOfType });
}
