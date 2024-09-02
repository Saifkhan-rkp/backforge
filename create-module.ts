import { cwd } from "process";
import { ModuleTemplateArgs, TemplateMode } from "./templates/types.js";
import { genModule } from "./templates/index.js";
import { getSrcFilesAndDir } from "./utils/copy.js";
import { extname } from "path";


export async function createModule({ moduleName, dest }: ModuleTemplateArgs) {
  const projDir = cwd();
  await genModule({
    moduleName,
    dest,
    projDir
  })
}
