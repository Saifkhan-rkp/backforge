import { PackageManager } from '../helpers/get-pkg-manager.js'

export type TemplateType =
    | "default"
    | "default-empty"
    | "basic"
    | "basic-empty";

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
