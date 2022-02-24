import * as t2d2 from '@t2d2/core';

describe("resources", () => {
  let profile: t2d2.Profile;
  let currentState: t2d2.ParsedTFPlan;

  beforeAll(async () => { 
    profile = await t2d2.init({
      profileName: 'resources',
      workspaceDir: './tf',
    })

    currentState = await t2d2.plan(profile, {})
  })

  test("your tests go here", () => { 
    // here's a sample test
    expect(currentState).toHaveRootModuleResourceOfType("time_sleep")
  })
})
