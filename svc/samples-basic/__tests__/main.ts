import * as t2d2 from '@t2d2/core';

describe("main.tf", () => {
  let profile: t2d2.Profile;
  let plan: t2d2.ParsedTFPlan;

  beforeAll(async () => {
    profile = await t2d2.init({
      profileName: 'main',
      workspaceDir: './src',
    })

    plan = await t2d2.plan(profile, { 
      vars: {
        "wait_time": "1s"
      }
    })
  })

  test("time_sleep should be created", () => {
    // Check if the root module has a time_sleep resource
    expect(plan).toHaveRootModuleResourceOfType('time_sleep')
  })
})
