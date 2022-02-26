import * as jq from 'node-jq'

import { ParsedTFPlan } from "../parsed-tf-plan";
import { TFModule } from '../shapes/module';
import { TFResource } from '../shapes/resource';

// TODO: parse differently based on format_version
export const parsePlan = async (rawTFStateJsonString: string): Promise<ParsedTFPlan> => {
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

    const modules: unknown = await jq.run(
        '[(.planned_values.root_module.child_modules // [])[]]',
        rawTFStateJsonString,
        jqOptions);

    return new ParsedTFPlan(
        (versionData as any).formatVersion,
        (versionData as any).terraformVersion,
        rootModuleResources as unknown as TFResource[],
        modules as unknown as TFModule[],
        // TODO
        new Map<string, { value: string }>(),
        rawTFStateJsonString
    );
}
