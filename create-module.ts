import { cwd } from "process";
import { ModuleTemplate, ModuleTemplateArgs, TemplateMode } from "./templates/types.js";
import { genModule } from "./templates/index.js";
import { extname } from "path";
import { getSrcFilesAndDir } from "./utils/copy.js";


export async function createModule({ moduleName, dest }: ModuleTemplateArgs) {
  const projDir = cwd();
  
  const modTemplate: ModuleTemplate = "mod-template";
  /** Setting mode default to 'ts'  */
  let mode: TemplateMode = "ts";
  /** Searching for index.js or ts */
  const files = await getSrcFilesAndDir(["index.??", "src/index.??", "server.??"], projDir, "files");
  if (files.length > 0) {
      mode = extname(files[0]) === ".js" ? "js" : "ts";
  }
  
  await genModule({
    moduleName,
    dest,
    projDir,
    mode,
    modulePath: modTemplate
  })
}
