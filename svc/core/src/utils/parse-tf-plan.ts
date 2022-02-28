import * as jq from 'node-jq'

import { IParsedTFPlan } from "../shapes/i-parsed-tf-plan";
import { TFModule } from '../shapes/module';
import { TFResource } from '../shapes/resource';

// TODO: parse differently based on format_version
export const parseTFPlan = async (rawTFStateJsonString: string): Promise<IParsedTFPlan> => {
    const jqOptions = { input: 'string', output: 'json' }

    const versionData = await jq.run(
        `{
            formatVersion: .format_version,
            terraformVersion: .terraform_version
        }`,
        rawTFStateJsonString,
        jqOptions
    );

    const rootModuleResources: unknown = await jq.run(
        '[(.planned_values.root_module.resources // [])[]]',
        rawTFStateJsonString,
        jqOptions);

    const childModules: unknown = await jq.run(
        '[(.planned_values.root_module.child_modules // [])[]]',
        rawTFStateJsonString,
        jqOptions);

    return {
        formatVersion: (versionData as any).formatVersion,
        terraformVersion: (versionData as any).terraformVersion,
        rootModuleResources: rootModuleResources as unknown as TFResource[],
        childModules: childModules as unknown as TFModule[],
        // TODO
        variables: new Map<string, { value: string }>(),
        rawTFStateJsonString
    }
}
