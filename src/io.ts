/**
 * @author WMXPY
 * @namespace Version
 * @description IO
 */

import { readTextFile, writeTextFile } from "@sudoo/io";
import * as Fs from "fs";
import { VersionFile } from "./declare";

export const readConfig = async (path: string): Promise<VersionFile> => {

    const text: string = await readTextFile(path);
    const parsed: VersionFile = JSON.parse(text);

    return parsed;
};

export const readConfigSync = (path: string): VersionFile => {

    const text: string = Fs.readFileSync(path, 'utf8');
    const parsed: VersionFile = JSON.parse(text);

    return parsed;
};

export const writeConfig = async (path: string, version: string, spaces: number = 2): Promise<void> => {

    const structure: VersionFile = {
        version,
        next: 'patch',
    };

    const stringified: string = JSON.stringify(structure, null, spaces || 2);
    await writeTextFile(path, stringified);
    return;
};
