import { TFResource } from "./shapes/resource";
import { TFModule } from "./shapes/module";
import { IParsedTFPlan } from "./shapes/i-parsed-tf-plan";

export class ParsedTFPlan {
  constructor(private parsedPlan: IParsedTFPlan) { }

  public get resources(): TFResource[] {
    return [
      ...this.parsedPlan.rootModuleResources,
      ...this.parsedPlan.childModules.map(m => m.resources).flat()
    ]
  }

  public get rawState() { return this.parsedPlan.rawTFStateJsonString; }
  public get formatVersion(): string { return this.parsedPlan.formatVersion }
  public get tfVersion(): string { return this.parsedPlan.terraformVersion }

  public getResourceByAddress(address: string): TFResource {
    const matchedResources = this.resources.filter(r => r.address === address)
    if (matchedResources.length === 0)
      throw new Error(`Resource with address '${address}' does not exist.`)
    return matchedResources[0]
  }

  public getRootModuleResourceOfType(type: string): TFResource {
    const matchedResources = this.parsedPlan.rootModuleResources.filter(r => r.type === type)
    if (matchedResources.length === 0)
      throw new Error(`Resource of type '${type}' does not exist in the root module.`)
    return matchedResources[0]
  }

  public getModuleByAddress(address: string): TFModule {
    const matchedModules = this.parsedPlan.childModules.filter(m => m.address === address)
    if (matchedModules.length === 0) throw `Module at address '${address}' does not exist.`
    return  matchedModules[0]
  }
}