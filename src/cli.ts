/**
 * @author WMXPY
 * @namespace Version
 * @description CLI
 */

import { Argument, Coco, Command } from "@sudoo/coco";
import * as Path from "path";
import { readConfig, writeConfig } from "./io";
import { Version } from "./version";

const coco = Coco.create();
coco.command(Command.create('get').argument(Argument.create('path')).then(async (args: {
    readonly path: string;
}) => {
    const path: string = Path.resolve(args.path);
    const version: Version = await readConfig(path);
    console.log(version.toString());
}));

coco.command(Command.create('major').argument(Argument.create('path')).then(async (args: {
    readonly path: string;
}) => {
    const path: string = Path.resolve(args.path);
    const version: Version = await readConfig(path);
    const newVersion: Version = version.major();
    await writeConfig(path, newVersion);
}));

coco.command(Command.create('minor').argument(Argument.create('path')).then(async (args: {
    readonly path: string;
}) => {
    const path: string = Path.resolve(args.path);
    const version: Version = await readConfig(path);
    const newVersion: Version = version.minor();
    await writeConfig(path, newVersion);
}));

coco.command(Command.create('patch').argument(Argument.create('path')).then(async (args: {
    readonly path: string;
}) => {
    const path: string = Path.resolve(args.path);
    const version: Version = await readConfig(path);
    const newVersion: Version = version.patch();
    await writeConfig(path, newVersion);
}));

coco.command(Command.create('auto').argument(Argument.create('path')).then(async (args: {
    readonly path: string;
}) => {
    const path: string = Path.resolve(args.path);
    const version: Version = await readConfig(path);
    const newVersion: Version = version.auto();
    await writeConfig(path, newVersion);
}));

export const execute = async (args: string[]): Promise<void> => {

    await coco.go(args);
};
