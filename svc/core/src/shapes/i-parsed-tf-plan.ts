import { TFModule } from "./module";
import { TFResource } from "./resource";

export interface IParsedTFPlan {
  formatVersion: string
  terraformVersion: string
  rootModuleResources: TFResource[]
  childModules: TFModule[]
  // TODO
  variables: Map<string, { value: string }>
  rawTFStateJsonString: string
}