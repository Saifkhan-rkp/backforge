import chalk from 'chalk'
import { basename, dirname, join, resolve } from "node:path";
import { W_OK } from 'node:constants'
import { access } from 'node:fs/promises'
import { mkdirSync } from "node:fs";
import { PackageManager } from "./helpers/get-pkg-manager";
import { isFolderEmpty } from "./helpers/is-folder-empty.js";
import { getOnline } from './helpers/is-online.js';


// checks whether folder have proper access permission  
async function isWriteable(directory: string): Promise<boolean> {
    try {
        await access(directory, W_OK)
        return true
    } catch (err) {
        return false
    }
}

export async function createApp({
    appPath,
    packageManager,
    mongoose,
    useEjs
}: {
    appPath: string,
    packageManager: PackageManager,
    mongoose: boolean,
    useEjs: boolean
}): Promise<void> {

    const root = resolve(appPath)
    console.log(root, dirname(root));
    if (!(await isWriteable(dirname(root)))) {
        console.error(
            'The application path is not writable, please check folder permissions and try again.'
        )
        console.error(
            'It is likely you do not have write permissions for this folder.'
        )
        process.exit(1)
    }

    const appName = basename(root)

    mkdirSync(root, { recursive: true })

    if (!isFolderEmpty(root, appName)) {
        process.exit(1)
    }

    const useYarn = packageManager === 'yarn'
    const isOnline = !useYarn || (await getOnline())
    const originalDirectory = process.cwd()

    console.log(`Creating a new express app in ${chalk.green(root)} with ${chalk.yellow("by-express")}.`)
    console.log()

    process.chdir(root)

    const packageJsonPath = join(root, 'package.json')
    let hasPackageJson = false

}