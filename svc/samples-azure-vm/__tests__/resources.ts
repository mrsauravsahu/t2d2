import * as t2d2 from '@t2d2/core';

describe("resources", () => {
  let profile: t2d2.Profile;
  let currentState: t2d2.ParsedTFPlan;

  beforeAll(async () => { 
    profile = await t2d2.init({
      profileName: 'resources',
      workspaceDir: './src',
    })

    currentState = await t2d2.plan(profile, {
      vars: {
        location: "centralus",
        prefix: 't2d2',
        vm_pass: process.env.T2D2_VARS_VM_PASS
      }
    })
  })

  describe('resource group', () => {
    test("should create main resource group", () => { 
      expect(currentState.getResourceByAddress("azurerm_resource_group.rg"));
    })

    test('should use prefix in the resource group name', () => {
      const rg = currentState.getResourceByAddress("azurerm_resource_group.rg")
      expect((rg as any).values.name).toMatch(/^t2d2/)
    }) 
  })

  describe('vnet', () => {
    test("should create a vnet", () => {
      expect(currentState.getResourceByAddress("azurerm_virtual_network.vnet"));
    })

    test('should use prefix in the resource group name', () => {
      const rg = currentState.getResourceByAddress("azurerm_virtual_network.vnet")
      expect((rg as any).values.name).toMatch(/^t2d2/)
    }) 
  })

  describe('subnet', () => {
    test("should create a subnet", () => {
      expect(currentState.getResourceByAddress("azurerm_subnet.subnet"));
    })

    test('should use prefix in the resource group name', () => {
      const subnet = currentState.getResourceByAddress("azurerm_subnet.subnet")
      expect((subnet as any).values.name).toMatch(/^t2d2/)
    })

    test("should attach subnet to the vnet", () => {
      const vnet = currentState.getResourceByAddress("azurerm_virtual_network.vnet")
      const subnet = currentState.getResourceByAddress("azurerm_subnet.subnet")

      expect((subnet as any).values.virtual_network_name).toEqual((vnet as any).values.name)
    })
  })

  describe('vm', () => {
    test('should create a vm', () => {
      expect(currentState.getResourceByAddress("azurerm_linux_virtual_machine.vm"))
    })
  })

  describe('bastion host', () => {
    test('should create a bastion host', () => {
      expect(currentState.getResourceByAddress("azurerm_bastion_host.bastion"))
    })
  })
})
