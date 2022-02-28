import { ParsedTFPlan } from "@t2d2/core";

const toHaveRootModuleResourceOfType = (plan: ParsedTFPlan, type: string): jest.CustomMatcherResult => {
  try {
    plan.getRootModuleResourceOfType(type)
    return { pass: true, message: () => `The plan does contain a resource of type '${type}' at the root module.` }
  }
  catch (error) {
    return { pass: false, message: () => (error as Error).message }
  }
}

const toHaveModuleWithAddress = (plan: ParsedTFPlan, address: string): jest.CustomMatcherResult => {
  try {
    plan.getModuleByAddress(address)
    return { pass: true, message: () => `The plan does contains a module with address '${address}'.` }
  }
  catch (error) {
    return { pass: false, message: () => (error as Error).message }
  }
}

const toHaveResourceWithAddress = (plan: ParsedTFPlan, address: string): jest.CustomMatcherResult => {
  try {
    plan.getResourceByAddress(address)
    return { pass: true, message: () => `The plan does contains a resource at address '${address}'.` }
  }
  catch (error) {
    return { pass: false, message: () => (error as Error).message }
  }
}


export const registerJestMatchers = () => {
  expect.extend({ toHaveRootModuleResourceOfType });
  expect.extend({ toHaveModuleWithAddress });
  expect.extend({ toHaveResourceWithAddress });
}
