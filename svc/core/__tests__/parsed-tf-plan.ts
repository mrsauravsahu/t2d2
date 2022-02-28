import * as fs from 'fs/promises'
import * as path from 'path'

import { ParsedTFPlan } from "../src"
import { parseTFPlan } from "../src/utils/parse-tf-plan"

const loadParsedPlanFromRelativeInputFile = async (inputFile: string): Promise<ParsedTFPlan> => {
  const parsedPlan = await parseTFPlan(await fs.readFile(
    path.resolve(__dirname, `./inputs/${inputFile}`),
    { encoding: 'utf-8' }
  ))
  const plan = new ParsedTFPlan(parsedPlan)
  return plan
}

describe('ParsedTFPlan', () => {
  describe('getResourceByAddress', () => {
    let plan: ParsedTFPlan;
    beforeAll(async () => { plan = await loadParsedPlanFromRelativeInputFile('basic-without-modules.input.json') })

    test('should throw Error if the required resource does not exist', () => {
      expect(() => { plan.getResourceByAddress('not_present.not_present') })
        .toThrowError('Resource with address \'not_present.not_present\' does not exist.')
    })

    test('should match resource snapshot if exists', () => {
      expect(plan.getResourceByAddress('time_sleep.wait_some_time')).toMatchSnapshot()
    })
  })

  describe('getRootModuleResourceOfType', () => {
    let plan: ParsedTFPlan;
    beforeAll(async () => { plan = await loadParsedPlanFromRelativeInputFile('basic-without-modules.input.json') })

    test('should throw Error if the required root resource of type does not exist', () => {
      expect(() => { plan.getRootModuleResourceOfType('not_existent_resource_type') })
        .toThrowError('Resource of type \'not_existent_resource_type\' does not exist in the root module.')
    })

    test('should match snapshot if resource of type exists', () => {
      expect(plan.getRootModuleResourceOfType('time_sleep')).toMatchSnapshot()
    })
  })

  describe('getModuleByAddress', () => {
    let plan: ParsedTFPlan;
    beforeAll(async () => {
      plan = await loadParsedPlanFromRelativeInputFile('get-module-by-address.input.json')
    })

    test('should throw Error if module does not exist', () => {
      expect(() => { plan.getModuleByAddress('module.not_present') })
        .toThrowError('Module at address \'module.not_present\' does not exist.')
    })

    test('should match module snapshot if exists', () => {
      expect(plan.getModuleByAddress('module.files')).toMatchSnapshot();
    })
  })
})
