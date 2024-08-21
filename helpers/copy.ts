/* eslint-disable import/no-extraneous-dependencies */
import { resolve, dirname, basename, join } from 'node:path'
import { copyFile, mkdir } from 'node:fs/promises'
import glob from 'fast-glob'


interface CopyOption {
  cwd?: string
  rename?: (basename: string) => string
  parents?: boolean
}

const identity = (x: string) => x

export const copy = async (
  src: string | string[],
  dest: string,
  { cwd, rename = identity, parents = true }: CopyOption = {}
) => {
  const source = typeof src === 'string' ? [src] : src

  if (source.length === 0 || !dest) {
    throw new TypeError('`src` and `dest` are required')
  }

  console.log("debug 4 : source ", source, dest, cwd)
  const sourceFiles = await glob.async(source, {
    cwd,
    dot: true,
    absolute: false,
    stats: false,
  })

  const destRelativeToCwd = cwd ? resolve(cwd, dest) : dest

  console.log("debug 1 : " ,destRelativeToCwd, sourceFiles)
  
  return Promise.all(
    sourceFiles.map(async (p) => {
      const dirName = dirname(p)
      const baseName = rename(basename(p))
      
      const from = cwd ? resolve(cwd, p) : p
      const to = parents
      ? join(destRelativeToCwd, dirName, baseName)
      : join(destRelativeToCwd, baseName)
      
      // Ensure the destination directory exists
      await mkdir(dirname(to), { recursive: true })
      
      console.log("debug 2 : " ,dirName, baseName, from, to)
      
      return copyFile(from, to)
    })
  )
}