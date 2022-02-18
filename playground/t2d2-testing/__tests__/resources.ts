import * as t2d2 from '@mrsauravsahu/t2d2';

describe("resources", () => {
  let profile: t2d2.Profile;
  let currentPlan: t2d2.TerraformState;

  beforeAll(async () => {
    profile = await t2d2.init({
      profileName: 'resources',
      workspaceDir: '../t2d2-tf',
    })

    currentPlan = await t2d2.plan(profile, { 
      vars: {
        "wait_time": "1s"
      }
    })
  })

  test("time_sleep should be created", () => {
    expect(currentPlan.state.planned_values.root_module.resources[0].type).toEqual("time_sleep")
  })
})
