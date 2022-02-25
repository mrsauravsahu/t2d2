import { execa, ExecaChildProcess } from 'execa'

import { InitOpts } from './shapes/init-options';
import { Profile } from './shapes/profile';

export const init = async (options: InitOpts) => {
  const { stdout, stderr } = await execa('terraform', ['init'], {
    cwd: options.workspaceDir
  })

  stdout !== '' ? console.log(stdout) : undefined
  stderr!== '' ? console.log(stderr) : undefined

  const profile: Profile = {
    name: options.profileName,
    workspaceDir: options.workspaceDir
  }

  return profile;
}
