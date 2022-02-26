import { ParsedTFPlan } from "../../src"
import { parseTFPlan } from "../../src/utils/parse-tf-plan"

describe('parsePlan', () => {
  test('should return an Instance of ParsedTFPlan', () => {
    expect(parseTFPlan('{}')).resolves.toBeInstanceOf(ParsedTFPlan)
  })
})