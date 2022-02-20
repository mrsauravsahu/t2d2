import * as jq from 'node-jq'

import { Resource } from "../shapes/tf-plan";

export const getResources = async (rawTFStateJsonString: string): Promise<Resource[]> => {
  const resourcesFilter = '[.planned_values.root_module.resources[], .planned_values.root_module.child_modules[].resources[]]'

  const resources: any = await jq.run(resourcesFilter, rawTFStateJsonString, {
    input: 'string',
    output: 'json'
  })

  return (resources as Resource[])
}

export const getByAddress = (resources: Resource[], address: string): Promise<Resource | null> => {
  const matchedResources = resources.filter(p => p.address === address)
  let result: Resource | null = null;

  if (matchedResources.length > 0) result = matchedResources[0]
  return Promise.resolve(result)
}