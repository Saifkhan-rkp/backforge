#! /usr/bin/env node

import chalk from 'chalk'
import Conf from 'conf'
import { Command } from 'commander'
import prompts from 'prompts'
import type { InitialReturnValue } from "prompts";
import { basename, resolve } from 'node:path';
import { existsSync } from 'node:fs';
import { getPkgManager, PackageManager } from './helpers/get-pkg-manager.js';
import { isFolderEmpty } from './helpers/is-folder-empty.js';
import { validateNpmName } from './helpers/validate-pkg.js';
import packageJson from "./package.json"

// const _chalk = await import("chalk").then(m=>m.default);

const handleSigTerm = () => process.exit(0)

process.on('SIGINT', handleSigTerm)
process.on('SIGTERM', handleSigTerm)

// For prompt state handling
const onPromptState = (state: {
    value: InitialReturnValue
    aborted: boolean
    exited: boolean
}) => {
    if (state.aborted) {
        // If we don't re-enable the terminal cursor before exiting
        // the program, the cursor will remain hidden
        process.stdout.write('\x1B[?25h')
        process.stdout.write('\n')
        process.exit(1)
    }
}


async function init() {

    const conf = new Conf({projectName:"lets-go-with-express"})

    let projectName: string | undefined;

    const program: Command = new Command(packageJson.name)
        .version(
            packageJson.version,
            '-v, --version',
            'Output the current version of create-by-express.'
        )
        .arguments('[project-directory]')
        .usage(`${chalk["green"]('[project-directory]')} [options]`)
        .helpOption('-h, --help', 'Display this help message.')
        .option("--use-ejs", "Initialize with templating view engine using ejs")
        .action((name) => {
            if (name && !name.startsWith('--no-')) {
                projectName = name
            }
        })
        .allowUnknownOption()
        .parse(process.argv);

    const opts = program.opts()
    const { args } = program;

    const packageManager: PackageManager = getPkgManager();

    if (typeof projectName === "string") {
        projectName = projectName.trim()
    }

    if (!projectName) {
        const res = await prompts({
            onState: onPromptState,
            type: 'text',
            name: 'path',
            message: 'What is your project named?',
            initial: 'my-app',
            validate: (name) => {
                const validation = validateNpmName(basename(resolve(name)))
                if (!validation.valid) {
                    return 'Invalid project name: ' + validation.problems[0]
                }
                return true
            },
        })

        if (typeof res.path === 'string') {
            projectName = res.path.trim()
        }
    }

    if (!projectName) {
        console.log(
            '\nPlease specify the project directory:\n' +
            `  ${chalk.cyan(opts.name())} ${chalk.green('<project-directory>')}\n` +
            'For example:\n' +
            `  ${chalk.cyan(opts.name())} ${chalk.green('my-express-app')}\n\n` +
            `Run ${chalk.cyan(`${opts.name()} --help`)} to see all options.`
        )
        process.exit(1)
    }
    const appPath = resolve(projectName)
    const appName = basename(appPath)

    const validation = validateNpmName(appName)
    if (!validation.valid) {
        console.error(
            `Could not create a project called ${chalk.red(
                `"${appName}"`
            )} because of npm naming restrictions:`
        )

        validation.problems.forEach((p) =>
            console.error(`    ${chalk.red(chalk.bold('*'))} ${p}`)
        )
        process.exit(1)
    }

    if (existsSync(appPath) && !isFolderEmpty(appPath, appName)) {
        process.exit(1)
    }

    const preferences = {
        useEjs: false
    }

    const getPrefOrDefault = (opt: string) => preferences[opt];

    console.log(opts)

    if (!opts.useEjs && !args.includes('--no-ejs')) {
        // if (skipPrompt) {
        //     opts.eslint = getPrefOrDefault('eslint')
        // } else {
        const styledEjs = chalk.blue('Ejs')
        const { eslint } = await prompts({
            onState: onPromptState,
            type: 'toggle',
            name: 'eslint',
            message: `Would you like to use ${styledEjs}?`,
            initial: getPrefOrDefault('useEjs'),
            active: 'Yes',
            inactive: 'No',
        })
        opts.useEjs = Boolean(eslint)
        preferences.useEjs = Boolean(eslint)
        // }
    }

    console.log({ projectName, ...preferences })
    process.exit(0);
    // if (!projectName) {
    //     console.log(first)
    // }
}

init();