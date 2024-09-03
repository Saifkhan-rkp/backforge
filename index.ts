#!/usr/bin/env node --no-warnings

import chalk from 'chalk'
import Conf from 'conf'
import { Command } from 'commander'
import prompts from 'prompts'
import type { InitialReturnValue } from "prompts";
import { basename, resolve } from 'node:path';
import { existsSync } from 'node:fs';
import { getPkgManager, PackageManager } from './utils/get-pkg-manager.js';
import { isFolderEmpty } from './utils/is-folder-empty.js';
import { validateNpmName } from './utils/validate-pkg.js';
import packageJson from "./package.json" assert { type: "json"}
import { createApp } from './create-app.js';
import { createModule } from './create-module.js';
import { ModuleTemplateArgs } from './templates/types.js';

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

const conf = new Conf({ projectName: "backforge" })

let projectName: string | undefined;
const program: Command = new Command(packageJson.name)
    .version(
        packageJson.version,
        '-v, --version',
        'Output the current version of backforge.'
    )
    .arguments('[project-directory]')
    .usage(`${chalk["green"]('[project-directory]')} [options]`)
    .helpOption('-h, --help', 'Display this help message.')
    // .option("-e, --empty", "Initialize empty express app with template")
    .option("-m, --module <module-name>", "Creates a module for default express template of backforge")
    .option("-d, --dest <destination>", "Destination path for module creation note: it does not work app generation")
    .option("-js, --javascript", "Initialize express app with javascript template")
    .option("--basic", "Initialize with basic template of express app")
    .option('--disable-git', `Skip initializing a git repository.`)
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


async function app_init() {


    if (typeof projectName === "string") {
        projectName = projectName.trim()
    }

    if (!projectName) {
        const res = await prompts({
            onState: onPromptState,
            type: 'text',
            name: 'path',
            message: 'What is your project named?',
            initial: 'my-express-app',
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

    const prefs = (conf.get('prefs') || {}) as Record<
        string,
        boolean | string
    >

    const defaults: typeof prefs = {
        typescript: true,
        javascript: false
    }

    const getPrefOrDefault = (opt: string) => prefs[opt] || defaults[opt];

    /** Printing note ts is not available for basic template */
    opts.typescript
        && opts.basic
        && console.log(`${chalk.bgYellow("!Note:")} Currently typescript is not available for ${chalk.blue("basic")} template`);

    if (!opts.basic && !opts.javascript && !opts.typescript && !args.includes('--no-typescript')) {
        const styledTypeScript = chalk.blue('TypeScript')
        const { typescript } = await prompts(
            {
                type: 'toggle',
                name: 'typescript',
                message: `Would you like to use ${styledTypeScript}?`,
                initial: getPrefOrDefault('typescript'),
                active: 'Yes',
                inactive: 'No',
            },
            {
                onCancel: () => {
                    console.error('Exiting.')
                    process.exit(1)
                },
            }
        )
        opts.typescript = Boolean(typescript)
        opts.javascript = !Boolean(typescript)
        prefs.typescript = Boolean(typescript)
    }

    try {
        await createApp({
            appPath: projectName,
            packageManager: packageManager,
            typescript: opts.typescript,
            empty: opts.empty,
            disableGit: opts.disableGit,
            basic: opts.basic
        })
        conf.set("prefs", prefs)
    } catch (error) {
        console.error(error)
    }
    // process.exit(0);

}

async function moduel_init() {
    const isModuleName = typeof opts.module === "string";
    if (opts.module === true || (isModuleName && !/^[a-z][a-z0-9_]*$/.test(opts.module))) {
        console.error(chalk.red("Please provide module name or valid module name (ex. users, stroy_blog, blog2)"));
        console.error("\nExiting..");
        process.exit(1);
    }
    if (isModuleName) {
        opts.module.trim();
        const moduleArgs: ModuleTemplateArgs = {
            moduleName: opts.module,
        }
        if (typeof opts.dest === "string") {
            if (/^((\/?[a-zA-Z0-9-_]+)+|\/)$/gm.test(opts.dest)) {
                opts.dest.trim()
                moduleArgs.dest = opts.dest;
            } else {
                console.error(chalk.red("Error: "), "Invalid destination (not)provided")
                process.exit(1);
            }
        }

        try {
            console.log(`\nInitialized generation of module ${chalk.blue(opts.module)}`)
            await createModule(moduleArgs);
        } catch (error) {
            console.error(error)

        }
    } else {
        console.error(chalk.red("Error: "), "Module name not provided")
    }
}

async function exec() {

    if (!opts.module || projectName) {
        await app_init();
    }
    if (opts.module) {
        await moduel_init();
    }
}

exec();
// app_init();