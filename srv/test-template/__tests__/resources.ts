import * as t2d2 from 't2d2';

describe("resources", () => {
  let profile: t2d2.Profile;
  let currentState: t2d2.TFState;

  beforeAll(async () => { 
    profile = await t2d2.init({
      profileName: 'resources',
      workspaceDir: './tf',
    })

    currentState = await t2d2.plan(profile, {})
  })

  test("your tests go here", () => { 
    // here's a sample test
    expect(currentState).hasRootModuleResourceOfType("time_sleep")
  })
})
