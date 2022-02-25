import * as jq from 'node-jq'

import { ParsedTFPlan } from "../parsed-tf-plan";
import { Resource } from '../shapes/tf-plan';

export const parsePlan = async (rawTFStateJsonString: string): Promise<ParsedTFPlan> => {
    const jqOptions = { input: 'string', output: 'json' }

    const rootModuleResources: unknown = await jq.run(
        '[(.planned_values.root_module.resources // [])[]]',
        rawTFStateJsonString,
        jqOptions);

    const childModuleResources: unknown = await jq.run(
        '[(.planned_values.root_module.child_modules // [])[].resources[]]',
        rawTFStateJsonString,
        jqOptions);

    return new ParsedTFPlan(
        rootModuleResources as unknown as Resource[],
        childModuleResources as unknown as Resource[],
        rawTFStateJsonString
    );
}
