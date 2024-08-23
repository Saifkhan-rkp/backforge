import chalk from 'chalk'
import { basename, dirname, join, resolve } from "node:path";
import { W_OK } from 'node:constants'
import { access } from 'node:fs/promises'
import { existsSync, mkdirSync } from "node:fs";
import { PackageManager } from "./helpers/get-pkg-manager";
import { isFolderEmpty } from "./helpers/is-folder-empty.js";
import { getOnline } from './helpers/is-online.js';
import { TemplateMode, TemplateType } from "./templates/types.js";
import { installTemplate } from './templates/index.js';
import { tryGitInit } from './helpers/try-git';

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
    empty,
    disableGit
}: {
    appPath: string,
    packageManager: PackageManager,
    empty: boolean,
    disableGit:boolean
}): Promise<void> {
    /** Currently setting mode is only for js  */
    const mode: TemplateMode = 'js'
    const template: TemplateType = `default${empty ? '-empty' : ''}`

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

    await installTemplate({
        appName: appName,
        root: root,
        mode: mode,
        template: template,
        isOnline: isOnline,
        packageManager: packageManager,
    })

    if (disableGit) {
        console.log('Skipping git initialization.')
        console.log()
    } else if (tryGitInit(root)) {
        console.log('Initialized a git repository.')
        console.log()
    }

    let cdpath: string
    if (join(originalDirectory, appName) === appPath) {
        cdpath = appName
    } else {
        cdpath = appPath
    }

    console.log(`${chalk.green('Success!')} Created ${appName} at ${appPath}`)

    /** Checking if package.json is available in app */
    hasPackageJson = existsSync(packageJsonPath)

    if (hasPackageJson) {
        console.log('Inside that directory, you can run several commands:')
        console.log()
        console.log(chalk.cyan(`  ${packageManager} ${useYarn ? '' : 'run '}dev`))
        console.log('    Starts the development server.')
        console.log()
        console.log(chalk.cyan(`  ${packageManager} start`))
        console.log('    Runs the built app in production mode.')
        console.log()
        console.log('We suggest that you begin by typing:')
        console.log()
        console.log(chalk.cyan('  cd'), cdpath)
        console.log(`  ${chalk.cyan(`${packageManager} ${useYarn ? '' : 'run '}dev`)}`)
    }
    console.log()
}