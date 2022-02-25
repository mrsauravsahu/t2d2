import { Resource, TFPlan } from "./shapes/tf-plan";

export class ParsedTFPlan {
  constructor(
    private rootModuleResources: Resource[],
    private childModuleResources: Resource[],
    private raw: string) {
  }

  private get resources() {
    return [
      ...this.rootModuleResources,
      ...this.childModuleResources
    ]
  }
  public get rawState() { return this.raw; }

  public getResourceByAddress(address: string): Resource | null {
    const matchedResources = this.resources.filter(r => r.address === address)
    let result: Resource | null = null;

    if (matchedResources.length > 0) result = matchedResources[0]
    return result
  }

  public hasResourceByAddress(address: string): void {
    const resource = this.getResourceByAddress(address)
    if (resource === null) throw new Error(`Resource with address '${address}' does not exist.`)
  }

  public getRootModuleResourceOfType(type: string): Resource | null {
    const matchedResources = this.rootModuleResources.filter(r => r.type === type)
    let result: Resource | null = null;

    if (matchedResources.length > 0) result = matchedResources[0]
    return result
  }

  public hasRootModuleResourceOfType(type: string): void {
    const rootModuleResource = this.getRootModuleResourceOfType(type)
    if (rootModuleResource === null) throw new Error(`Resource of type '${type}' does not exist in the root module.`)
  }
}