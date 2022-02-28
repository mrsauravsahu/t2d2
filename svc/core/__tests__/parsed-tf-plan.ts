import * as fs from 'fs/promises'
import * as path from 'path'

import { ParsedTFPlan } from "../src"
import { parseTFPlan } from "../src/utils/parse-tf-plan"

describe('ParsedTFPlan', () => {
  describe('modules', () => {
    let plan: ParsedTFPlan;
    describe('getModuleByAddress', () => {
      beforeAll(async () => {
        const parsedPlan = await parseTFPlan(await fs.readFile(
          path.resolve(__dirname, './inputs/get-module-by-address.input.json'),
          { encoding: 'utf-8' }
        ))
        plan = new ParsedTFPlan(parsedPlan)
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
})