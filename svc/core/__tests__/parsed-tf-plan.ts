import * as fs from 'fs/promises'
import * as path from 'path'

import { ParsedTFPlan } from "../src"
import { parseTFPlan } from "../src/utils/parse-tf-plan"

describe('ParsedTFPlan', () => {
  describe('getModuleByAddress', () => {
    let plan: ParsedTFPlan;

    beforeAll(async () => {
      const parsedPlan = await parseTFPlan(await fs.readFile(
        path.resolve(__dirname, './inputs/get-module-by-address.input.json'),
        { encoding: 'utf-8' }
      ))
      plan = new ParsedTFPlan(parsedPlan)
    })

    test('should return null if module does not exist', async () => {
      expect(plan.getModuleByAddress('module.not_present')).toBeNull()
    })

    test('should match module snapshot if exists', async () => {
      expect(plan.getModuleByAddress('module.files')).toMatchSnapshot();
    })
  })
})