import { writeFile } from 'fs/promises';
import * as path from 'path';
import { execa } from 'execa';
import { PlanOptions } from './shapes/plan-options';
import { Profile } from './shapes/profile';
import { TFState } from './tf-state';

export const plan = async (profile: Profile, options: PlanOptions): Promise<TFState> => {
  var planArgs: string[] = [
    'plan',
    ...(options.varFile ? ['-var-file', options.varFile] : []),
    ...(options.vars ? Object.keys(options.vars).map((key) => ['-var', `${key}=${(options?.vars || {})[key] ?? ''}`]) : []).flat(),
    "-out=terraform.tfstate.tmp"
  ]

  const plan = await execa('terraform', planArgs, {
    cwd: profile.workspaceDir
  });

  plan.stdout !== '' ? console.log(plan.stdout) : undefined
  plan.stderr !== '' ? console.log(plan.stderr) : undefined

  var showArgs: string[] = [
    "show",
    "-json",
    "terraform.tfstate.tmp"
  ]

  const show = await execa('terraform', showArgs, {
    cwd: profile.workspaceDir
  });

  show.stdout !== '' ? console.log(show.stdout) : undefined
  show.stderr !== '' ? console.log(show.stderr) : undefined

  const tfPlanJsonPath = path.join(profile.workspaceDir, 'plan.json');
  await writeFile(tfPlanJsonPath, show.stdout, { encoding: 'utf-8' })

  const state = new TFState(
    JSON.parse(show.stdout),
    show.stdout
  )

  return state
}