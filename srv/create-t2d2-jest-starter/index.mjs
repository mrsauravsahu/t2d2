import { promises as fs } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));

const copyDir = async (rootDir, destination, isRoot = false) => {
  if (!isRoot) {
    // console.log('mkdir', destination)
    await fs.mkdir(destination)
  }

  for(let item of await fs.readdir(rootDir, {withFileTypes: true})) {
    const sourceFullPath = join(rootDir, item.name)
    const destinationFullPath = join(destination, item.name)

    if (item.isDirectory()) {
      await copyDir(sourceFullPath, destinationFullPath)
    }
    else {
      // console.log('cp file', sourceFullPath, destinationFullPath)
      await fs.copyFile(sourceFullPath, destinationFullPath)
    }
  }
}

// console.log('start', __dirname, process.cwd(), true)
const templatePath = join(__dirname, 'template')
await copyDir(templatePath, process.cwd(), true)
