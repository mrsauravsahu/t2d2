import { TFResource } from "./resource";

export interface TFModule {
  address: string,
  resources: TFResource[]
}