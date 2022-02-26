import { ParsedTFPlan } from "../../src"
import { parsePlan } from "../../src/utils/parse-plan"

describe('parsePlan', () => {
  test('should return an Instance of ParsedTFPlan', () => {
    expect(parsePlan('{}')).resolves.toBeInstanceOf(ParsedTFPlan)
  })
})