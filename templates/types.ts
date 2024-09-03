import { PackageManager } from '../utils/get-pkg-manager.js'

export type TemplateType =
    | "default"
    | "default-empty"
    | "basic"
    | "basic-empty";

export type ModuleTemplate = "mod-template";

export type TemplateMode = "js" | "ts";

export interface GetTemplateFileArgs {
    template: TemplateType;
    mode: TemplateMode;
    file: string;
}

export interface InstallTemplateArgs {
    appName: string;
    root: string;
    packageManager: PackageManager;
    isOnline: boolean;
    template: TemplateType;
    mode: TemplateMode;
}

export interface ModuleTemplateArgs {
    moduleName: string;
    dest?: string
}