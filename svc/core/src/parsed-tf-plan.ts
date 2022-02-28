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

  public getResourceByAddress(address: string): TFResource | null {
    const matchedResources = this.resources.filter(r => r.address === address)
    let result: TFResource | null = null;

    if (matchedResources.length > 0) result = matchedResources[0]
    return result
  }

  public hasResourceByAddress(address: string): void {
    const resource = this.getResourceByAddress(address)
    if (resource === null) throw new Error(`Resource with address '${address}' does not exist.`)
  }

  public getRootModuleResourceOfType(type: string): TFResource | null {
    const matchedResources = this.parsedPlan.rootModuleResources.filter(r => r.type === type)
    let result: TFResource | null = null;

    if (matchedResources.length > 0) result = matchedResources[0]
    return result
  }

  public hasRootModuleResourceOfType(type: string): void {
    const rootModuleResource = this.getRootModuleResourceOfType(type)
    if (rootModuleResource === null) throw new Error(`Resource of type '${type}' does not exist in the root module.`)
  }

  public getModuleByAddress(address: string) {
    const matchedModules = this.parsedPlan.childModules.filter(m => m.address === address)

    let result: TFModule | null = null
    if (matchedModules.length > 0) result = matchedModules[0]
    return result
  }
}