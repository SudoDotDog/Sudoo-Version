/**
 * @author WMXPY
 * @namespace Version
 * @description IO
 */

import { readTextFile } from "@sudoo/io";
import { Version } from "./version";

type VersionFile = {

    readonly version: string;
};

export const readConfig = async (path: string): Promise<Version> => {

    const text: string = await readTextFile(path);
    const parsed: VersionFile = JSON.parse(text);

    return Version.create(parsed.version);
};
