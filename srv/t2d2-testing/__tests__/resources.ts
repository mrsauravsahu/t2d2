import * as t2d2 from 't2d2';

describe("resources", () => {
  let profile: t2d2.Profile;
  let currentState: t2d2.TFState;

  beforeAll(async () => {
    profile = await t2d2.init({
      profileName: 'resources',
      workspaceDir: '../t2d2-tf',
    })

    currentState = await t2d2.plan(profile, { 
      vars: {
        "wait_time": "1s"
      }
    })
  })

  test("time_sleep should be created", () => {
    // Check if the root module has a time_sleep resource
    expect(currentState).hasRootModuleResourceOfType('time_sleep1')
  })

  test("sample_file should be created", async () => {
    // Check if there are any resources with the given address
    // Searches across root module + all child modules
    await currentState.hasResourceByAddress("time_sleep.wait_some_time")
  })

  test("sample_file should come from hashicorp/time provider", async () => {
    // Get the first time_sleep resource in the state
    const fileResource = await currentState.getResourceByAddress("time_sleep.wait_some_time")

    expect(fileResource).toEqual(
      expect.objectContaining({
        type: 'time_sleep',
        provider_name: 'registry.terraform.io/hashicorp/time'
      })
    )
  })
})
