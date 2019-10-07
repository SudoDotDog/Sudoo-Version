/**
 * @author WMXPY
 * @namespace Version
 * @description IO
 */

import { readTextFile, writeTextFile } from "@sudoo/io";
import { Version } from "./version";

type VersionFile = {

    readonly version: string;
};

export const readConfig = async (path: string): Promise<Version> => {

    const text: string = await readTextFile(path);
    const parsed: VersionFile = JSON.parse(text);

    return Version.create(parsed.version);
};

export const writeConfig = async (path: string, version: Version): Promise<void> => {

    const structure: VersionFile = {
        version: version.toString(),
    };

    const stringified: string = JSON.stringify(structure, null, 2);
    await writeTextFile(path, stringified);
    return;
};
