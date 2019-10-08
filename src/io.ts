/**
 * @author WMXPY
 * @namespace Version
 * @description IO
 */

import { readTextFile, writeTextFile } from "@sudoo/io";
import * as Fs from "fs";
import { VersionFile } from "./declare";
import { Version } from "./version";

export const readConfig = async (path: string): Promise<Version> => {

    const text: string = await readTextFile(path);
    const parsed: VersionFile = JSON.parse(text);

    return Version.create(parsed.version, parsed.next);
};

export const readConfigSync = (path: string): Version => {

    const text: string = Fs.readFileSync(path, 'utf8');
    const parsed: VersionFile = JSON.parse(text);

    return Version.create(parsed.version, parsed.next);
};

export const writeConfig = async (path: string, version: Version, spaces: number = 2): Promise<void> => {

    const structure: VersionFile = {
        version: version.toString(),
        next: 'patch',
    };

    const stringified: string = JSON.stringify(structure, null, spaces || 2);
    await writeTextFile(path, stringified);
    return;
};
