import { cwd } from "process";
import { ModuleTemplateArgs } from "./templates/types";
import fs from "fs/promises";
import { copy, getSrcFilesAndDir } from "./utils/copy.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { Sema } from "async-sema";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

dirname

export async function cretaeModule({ moduleName, mode, dest }: ModuleTemplateArgs) {
    const projDir = cwd();
    let destFolder = dest? dest: "modules";

    if (!dest) {
        const source = ["**/modules", "!node_modules", "!dist"]
        const findModuleDir = await getSrcFilesAndDir(source, projDir, "dirs")
        if (findModuleDir.length > 0) {
            destFolder = findModuleDir[0]
        }
    }
    const moduleDir = join(projDir, destFolder, moduleName)

    const templatePath = join(__dirname, "templates", "modules", mode);

    await copy(["**"], moduleDir, {
        cwd: templatePath,
        rename(name) {
            return name.replace("module", moduleName);
        }
    })
    
    const moduleFiles = await getSrcFilesAndDir(["**"], moduleDir, "files");

    const writeModNameSema = new Sema(8, { capacity: moduleFiles.length });
    await Promise.all(
      moduleFiles.map(async (file) => {
        await writeModNameSema.acquire();
        const filePath = join(moduleDir, file);
        
        if ((await fs.stat(filePath)).isFile()) {
          await fs.writeFile(
            filePath,
            (await fs.readFile(filePath, "utf8"))
            .replace(/test/g, moduleName)
            .replace(/Test/g, moduleName[0].toUpperCase()+moduleName.slice(1))
            .replace(/module/g, moduleName),
          );
        }
        writeModNameSema.release();
      }),
    );

}

cretaeModule({ mode: "ts", moduleName: "users", dest:"/test" })