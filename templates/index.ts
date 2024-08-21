import path, { dirname } from "path";
import chalk from "chalk";
import os from "os";
import fs from "fs/promises";
import { GetTemplateFileArgs, InstallTemplateArgs } from "./types.js";
import { copy } from "../helpers/copy.js";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
    useEjs,
    mongoose,
}: InstallTemplateArgs) => {

    console.log(chalk.bold(`Using ${packageManager}.`));

    /**
     * Copy the template files to the target directory.
     */
    console.log("\nInitializing project with template:", template, "\n");

    const templatePath = path.join(__dirname, template, mode);
    const copySource = ["**"]
    if (!mongoose) {
        copySource.push("!config/connectionDB." + mode)
    }

    await copy(copySource, root, {
        parents: true,
        cwd: templatePath,
        rename(name) {
            switch (name) {
                case "gitignore": {
                    return `.${name}`;
                }
                default: {
                    return name;
                }
            }
        }

    }).then(() => console.log("debug3 : done all process"))

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
            cors: "2.8.5",
            dotenv: "16.4.5",
            express: "4.19.2",
            morgan:"1.10.0"

        },
        devDependencies: {
            nodemon: "3.1.4"
        },
    };

    if (mongoose) {
        packageJson.dependencies = {
            ...packageJson.dependencies,
            mongoose: "8.5.3"
        }
    }

    if (useEjs) {
        packageJson.dependencies = {
            ...packageJson.dependencies,
            "ejs-mate": "4.0.0"
        }
    }
    const devDeps = Object.keys(packageJson.devDependencies).length;
    if (!devDeps) delete packageJson.devDependencies;

    await fs.writeFile(
        path.join(root, "package.json"),
        JSON.stringify(packageJson, null, 2) + os.EOL,
    );
}