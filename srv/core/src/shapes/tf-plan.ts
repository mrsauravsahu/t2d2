export interface WaitTime {
  value: string;
}

export interface Variables {
  wait_time: WaitTime;
}

export interface Values {
  create_duration: string;
  destroy_duration?: any;
  triggers?: any;
}

export interface Resource {
  address: string;
  mode: string;
  type: string;
  name: string;
  provider_name: string;
  schema_version: number;
  values: Values;
}

export interface RootModule {
  resources: Resource[];
}

export interface PlannedValues {
  root_module: RootModule;
}

export interface After {
  create_duration: string;
  destroy_duration?: any;
  triggers?: any;
}

export interface AfterUnknown {
  id: boolean;
}

export interface Change {
  actions: string[];
  before?: any;
  after: After;
  after_unknown: AfterUnknown;
}

export interface ResourceChange {
  address: string;
  mode: string;
  type: string;
  name: string;
  provider_name: string;
  change: Change;
}

export interface Time {
  name: string;
  version_constraint: string;
}

export interface ProviderConfig {
  time: Time;
}

export interface CreateDuration {
  references: string[];
}

export interface Expressions {
  create_duration: CreateDuration;
}

export interface Resource2 {
  address: string;
  mode: string;
  type: string;
  name: string;
  provider_config_key: string;
  expressions: Expressions;
  schema_version: number;
}

export interface WaitTime2 {
  default: string;
  description: string;
}

export interface Variables2 {
  wait_time: WaitTime2;
}

export interface RootModule2 {
  resources: Resource2[];
  variables: Variables2;
}

export interface Configuration {
  provider_config: ProviderConfig;
  root_module: RootModule2;
}

export interface TFPlan {
  format_version: string;
  terraform_version: string;
  variables: Variables;
  planned_values: PlannedValues;
  resource_changes: ResourceChange[];
  configuration: Configuration;
}
