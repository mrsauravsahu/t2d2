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
})