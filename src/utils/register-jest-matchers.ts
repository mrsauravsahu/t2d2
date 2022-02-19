import * as jq from 'node-jq'
import { TFState } from "../tf-state";

export const hasRootModuleResourceOfType = async (state: TFState, type: string): Promise<jest.CustomMatcherResult> => {
  const matchedResources: any = await jq.run(`[.planned_values.root_module.resources[] | select(.type == "${type}")]`, state.rawState, {
    input: 'string',
    output: 'json'
  })

  const pass = (matchedResources as any[]).length > 0

  return {
    pass,
    message: pass ? () => `bruh` : () => `lel`
  }
}

export const registerJestMatchers = () => {
  expect.extend({ hasRootModuleResourceOfType });
}
