import * as fs from 'fs/promises'
import * as path from 'path'
import { ParsedTFPlan } from "../../src"
import { parseTFPlan } from "../../src/utils/parse-tf-plan"

describe('parsePlan', () => {
  test('should pick terraform plan version', async () => {
    const input = JSON.stringify({
      format_version: '1.0.0'
    })

    const parsedTFPlan = await parseTFPlan(input)
    expect(parsedTFPlan.formatVersion).toEqual("1.0.0");
  })

  test('should pick terraform version', async () => {
    const input = JSON.stringify({
      terraform_version: '1.1.6'
    })

    const parsedTFPlan = await parseTFPlan(input)
    expect(parsedTFPlan.terraformVersion).toEqual("1.1.6");
  })

  test('should pick root module resources', async () => {
    const input = JSON.stringify({
      terraform_version: '1.1.6',
      format_version: '1.0.0',
      planned_values: {
        root_module: {
          resources: [
            {
              address: "time_sleep.wait_some_time",
              mode: "managed",
              type: "time_sleep",
              name: "wait_some_time",
              provider_name: "registry.terraform.io/hashicorp/time",
              schema_version: 0,
              values: {
                create_duration: "1s",
                destroy_duration: null,
                triggers: null
              }
            }
          ]
        }
      }
    })

    const parsedTFPlan = await parseTFPlan(input)
    expect(parsedTFPlan.rootModuleResources.length).toBe(1)
  })

  test('should pick child modules', async () => {
    const inputString = await fs.readFile(
      path.resolve(__dirname, '../inputs/get-module-by-address.input.json'), {
      encoding: 'utf-8'
    })

    const plan = await parseTFPlan(inputString)
    expect(plan.childModules.length).toEqual(1)
  })
})
