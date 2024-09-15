import path, { dirname, extname } from "path";
import chalk from "chalk";
import os from "os";
import fs from "fs/promises";
import { GetTemplateFileArgs, InstallTemplateArgs, ModuleTemplate, TemplateMode } from "./types.js";
import { copy, getSrcFilesAndDir } from "../utils/copy.js";
import { fileURLToPath } from "url";
import { install } from "../utils/install.js";
import { Sema } from "async-sema";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let appMode: TemplateMode;

export function getTemplateFile({ file, template, mode }: GetTemplateFileArgs) {
    return path.join(__dirname, template, mode, file)
}

export const installTemplate = async ({
    appName,
    root,
    isOnline,
    mode,
    template,
    packageManager,
}: InstallTemplateArgs) => {

    console.log(chalk.bold(`Using ${packageManager}.`));
    appMode = mode;
    /**
     * Copy the template files to the target directory.
     */
    console.log("\nInitializing project with template:", template, "\n");

    const templatePath = path.join(__dirname, template, mode);
    const copySource = ["**"]

    await copy(copySource, root, {
        parents: true,
        cwd: templatePath,
        rename(name) {
            switch (name) {
                case "gitignore": {
                    return `.${name}`;
                }
                case "env-example": {

                    return `.${name.split("-").join(".")}`
                }
                case "README-template.md": {
                    return `README.md`
                }
                default: {
                    return name;
                }
            }
        }

    });

    const packageJson: any = {
        name: appName,
        version: "1.0.0",
        private: true,
        scripts: {
            dev: `nodemon index.js`,
            start: "node index.js",
        },
        /**
         * Default dependencies.
         */
        dependencies: {
            "body-parser": "^1.20.2",
            cors: "^2.8.5",
            dotenv: "^16.4.5",
            express: "^4.19.2",
            "http-status": "^1.7.4",
            mongoose: "^8.5.3",
            morgan: "^1.10.0"
        },
        devDependencies: {
            nodemon: "^3.1.4"
        },
    };

    if (mode === "ts") {
        packageJson.scripts = {
            dev: "nodemon index.ts",
            start: "node dist/index.js",
            build: "tsc"
        }
        packageJson.devDependencies = {
            ...packageJson.devDependencies,
            "@types/cors": "^2.8.17",
            "@types/express": "^4.17.21",
            "@types/morgan": "^1.9.9",
            "@types/node": "^22.5.0",
            "ts-node": "^10.9.2"
        }
    }

    const devDeps = Object.keys(packageJson.devDependencies).length;
    if (!devDeps) delete packageJson.devDependencies;

    await fs.writeFile(
        path.join(root, "package.json"),
        JSON.stringify(packageJson, null, 2) + os.EOL,
    );

    console.log("\nInstalling dependencies:");
    for (const dependency in packageJson.dependencies)
        console.log(`- ${chalk.cyan(dependency)}`);

    if (devDeps) {
        console.log("\nInstalling devDependencies:");
        for (const dependency in packageJson.devDependencies)
            console.log(`- ${chalk.cyan(dependency)}`);
    }

    console.log();

    await install(packageManager, isOnline).catch(err => console.log("Seems Insall giving problem here \n Try run ", chalk.yellow(err), " in your project directory"));
}

export const genModule = async ({
    moduleName,
    dest,
    projDir,
    modulePath,
    mode
}: {
    moduleName: string;
    dest: string | undefined;
    projDir: string;
    modulePath: ModuleTemplate;
    mode: TemplateMode;
}) => {
    let destFolder = dest ? dest : "modules";
    let templateMode = appMode ? appMode : mode;

    if (!dest) {
        console.log("\nDestination not provided...")
        console.log(`Searching modules folder into ${chalk.blue(projDir)}`)
        const source = ["**/modules", "!node_modules", "!dist"]
        const findModuleDir = await getSrcFilesAndDir(source, projDir, "dirs")
        if (findModuleDir.length > 0) {
            destFolder = findModuleDir[0]
        }
    }

    // const files = await getSrcFilesAndDir(["index.??", "src/index.??", "server.??"], projDir, "files");

    // if (files.length > 0) {
    //     mode = extname(files[0]) === ".js" ? "js" : "ts";
    // }

    const moduleDir = path.join(projDir, destFolder, moduleName);
    const templatePath = path.join(__dirname, modulePath, templateMode);

    console.log(`\nCopying module files...`);
    await copy(["**"], moduleDir, {
        cwd: templatePath,
        rename(name) {
            return name.replace("test", moduleName);
        }
    })

    const moduleFiles = await getSrcFilesAndDir(["**"], moduleDir, "files");

    const writeModNameSema = new Sema(8, { capacity: moduleFiles.length });
    await Promise.all(
        moduleFiles.map(async (file) => {
            await writeModNameSema.acquire();
            const filePath = path.join(moduleDir, file);

            if ((await fs.stat(filePath)).isFile()) {
                await fs.writeFile(
                    filePath,
                    (await fs.readFile(filePath, "utf8"))
                        .replace(/test/g, moduleName)
                        .replace(/Test/g, moduleName[0].toUpperCase() + moduleName.slice(1))
                        .replace(/module/g, moduleName),
                );
            }
            writeModNameSema.release();
        }),
    );

    console.log(`\n${chalk.blue(moduleName)} module created into ${chalk.yellow(moduleDir)}`)
    console.log();
}