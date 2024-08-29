import { cwd } from "process";
import { ModuleTemplateArgs } from "./templates/types";
import { readdir } from "fs/promises";
import glob from "fast-glob";
import { copy, getSrcFilesAndDir } from "./utils/copy.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

dirname

export async function cretaeModule({ moduleName, mode, dest }: ModuleTemplateArgs) {
    const projDir = cwd();
    let copyFolder = dest? dest: "modules";

    if (!dest) {
        const source = ["**/modules", "!node_modules", "!dist"]
        const findModuleDir = await getSrcFilesAndDir(source, projDir, "dirs")
        if (findModuleDir.length > 0) {
            copyFolder = findModuleDir[0]
        }
    }
    const moduleDir = join(projDir, copyFolder, moduleName)

    const templatePath = join(__dirname, "templates", "modules", mode);

    await copy(["**"], moduleDir, {
        cwd: templatePath,
        rename(name) {
            return name.replace("module", moduleName);
        }
    })

    // const writeSema = new Sema(8, { capacity: files.length });
    // await Promise.all(
    //   files.map(async (file) => {
    //     await writeSema.acquire();
    //     const filePath = path.join(root, file);
    //     if ((await fs.stat(filePath)).isFile()) {
    //       await fs.writeFile(
    //         filePath,
    //         (await fs.readFile(filePath, "utf8")).replace(
    //           `@/`,
    //           `${importAlias.replace(/\*/g, "")}`,
    //         ),
    //       );
    //     }
    //     writeSema.release();
    //   }),
    // );

}

cretaeModule({ mode: "ts", moduleName: "users", dest:"/test" })