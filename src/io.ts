/**
 * @author WMXPY
 * @namespace Version
 * @description IO
 */

import { readTextFile, writeTextFile } from "@sudoo/io";
import { VersionFile } from "./declare";
import { Version } from "./version";

export const readConfig = async (path: string): Promise<Version> => {

    const text: string = await readTextFile(path);
    const parsed: VersionFile = JSON.parse(text);

    return Version.create(parsed.version, parsed.next);
};

export const writeConfig = async (path: string, version: Version): Promise<void> => {

    const structure: VersionFile = {
        version: version.toString(),
    };

    const stringified: string = JSON.stringify(structure, null, 2);
    await writeTextFile(path, stringified);
    return;
};
