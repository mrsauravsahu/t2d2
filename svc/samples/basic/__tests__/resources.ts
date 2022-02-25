import * as t2d2 from '@t2d2/core';

describe("resources", () => {
  let profile: t2d2.Profile;
  let plan: t2d2.ParsedTFPlan;

  beforeAll(async () => {
    profile = await t2d2.init({
      profileName: 'resources',
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

  test("sample local_file should be created in a module", () => {
    // Check if there are any resources with the given address
    // Searches across root module + all child modules
    plan.hasResourceByAddress("module.files.local_file.sample")
  })

  test("sample_file have the right content", async () => {
    // Get the resource in the plan
    const fileResource = plan.getResourceByAddress("module.files.local_file.sample")

    // Because various resources have different shapes in the plan
    // we move to any type. 
    // Note that this might break in different terraform versions
    const resource = fileResource as any
    expect(resource.values.content).toEqual("1 1 2 3 5 8 13 21")
  })
})
