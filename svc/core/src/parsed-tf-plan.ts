import { TFResource } from "./shapes/resource";
import { TFModule } from "./shapes/module";

export class ParsedTFPlan {
  constructor(
    private _formatVersion: string,
    private _tfVersion: string,
    private _rootModuleResources: TFResource[],
    private _childModules: TFModule[],
    private _variables: Map<string, { value: string }>,
    private _raw: string) { }

  public get resources(): TFResource[] {
    return [
      ...this._rootModuleResources,
      ...this._childModules.map(module => module.resources).flat()
    ]
  }

  public get rawState() { return this._raw; }
  public get formatVersion(): string { return this._formatVersion }
  public get tfVersion(): string { return this._tfVersion }

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
    const matchedResources = this._rootModuleResources.filter(r => r.type === type)
    let result: TFResource | null = null;

    if (matchedResources.length > 0) result = matchedResources[0]
    return result
  }

  public hasRootModuleResourceOfType(type: string): void {
    const rootModuleResource = this.getRootModuleResourceOfType(type)
    if (rootModuleResource === null) throw new Error(`Resource of type '${type}' does not exist in the root module.`)
  }
}