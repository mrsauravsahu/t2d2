import { ParsedTFPlan } from "../../src"
import { parseTFPlan } from "../../src/utils/parse-tf-plan"

describe('parsePlan', () => {
  test('should return an Instance of ParsedTFPlan', () => {
    expect(parseTFPlan('{}')).resolves.toBeInstanceOf(ParsedTFPlan)
  })

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
    expect(parsedTFPlan.tfVersion).toEqual("1.1.6");
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
    expect(parsedTFPlan.resources.length).toBe(1)
  })
})