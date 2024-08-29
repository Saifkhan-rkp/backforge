/* eslint-disable import/no-extraneous-dependencies */
import { resolve, dirname, basename, join } from 'node:path'
import { copyFile, mkdir } from 'node:fs/promises'
import glob, { Options } from 'fast-glob'


interface CopyOption {
  cwd?: string
  rename?: (basename: string) => string
  parents?: boolean
}

const identity = (x: string) => x

export const getSrcFilesAndDir = async (src: string[], cwd: string | undefined, fetch: "files" | "dirs") => {
  const options: Options = {
    cwd,
    dot: true,
    absolute: false,
    stats: false,
  }
  if (fetch === "dirs") {
    options.onlyDirectories = true
  }
  const sourceFiles = await glob.async(src, options)
  return sourceFiles;
}

export const copy = async (
  src: string | string[],
  dest: string,
  { cwd, rename = identity, parents = true }: CopyOption = {}
) => {
  const source = typeof src === 'string' ? [src] : src

  if (source.length === 0 || !dest) {
    throw new TypeError('`src` and `dest` are required')
  }

  const sourceFiles = await getSrcFilesAndDir(source, cwd, "files")

  const destRelativeToCwd = cwd ? resolve(cwd, dest) : dest


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

      return copyFile(from, to)
    })
  )
}