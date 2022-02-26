import { TFResource } from "./shapes/resource";
import { TFModule } from "./shapes/module";

export class ParsedTFPlan {
  constructor(
    private formatVersion: string,
    private terraformVersion: string,
    private rootModuleResources: TFResource[],
    private childModules: TFModule[],
    private variables: Map<string, { value: string }>,
    private raw: string) { }

  private get resources(): TFResource[] {
    return [
      ...this.rootModuleResources,
      ...this.childModules.map(module => module.resources).flat()
    ]
  }
  public get rawState() { return this.raw; }

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
    const matchedResources = this.rootModuleResources.filter(r => r.type === type)
    let result: TFResource | null = null;

    if (matchedResources.length > 0) result = matchedResources[0]
    return result
  }

  public hasRootModuleResourceOfType(type: string): void {
    const rootModuleResource = this.getRootModuleResourceOfType(type)
    if (rootModuleResource === null) throw new Error(`Resource of type '${type}' does not exist in the root module.`)
  }
}