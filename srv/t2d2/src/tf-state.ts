import * as utils from "./utils/get-by-address";
import { Resource, TFPlan } from "./shapes/tf-plan";

export class TFState {
  constructor(
    private state: TFPlan,
    private raw: string) {
  }

  private _resources: Resource[] | undefined;
  private get resources() { return this._resources ?? [] }
  public get rawState() { return this.raw; }

  private async calculateResources(): Promise<void> {
    if (this._resources !== undefined) return
    this._resources = await utils.getResources(this.raw)
  }

  public async getResourceByAddress(address: string): Promise<Resource | null> {
    await this.calculateResources()
    return utils.getByAddress(this.resources, address)
  }

  public async hasResourceByAddress(address: string): Promise<Resource> {
    await this.calculateResources()
    const resource = await utils.getByAddress(this.resources, address)
    if (resource === null) throw new Error(`Resource with address '${address}' does not exist.`)
    return resource
  }
}