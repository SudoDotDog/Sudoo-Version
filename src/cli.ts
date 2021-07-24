/**
 * @author WMXPY
 * @namespace Version
 * @description CLI
 */

import { Argument, Coco, Command, Option } from "@sudoo/coco";
import * as Path from "path";
import { writeConfig } from "./io";
import { VersionPatcher } from "./version";

const coco = Coco.create();
coco.globalOption(Option.create('spaces').setName('spaces'));

type CommandOption = {

    readonly path: string;
    readonly spaces?: string;
};

coco.command(Command.create('get')
    .argument(Argument.create('path'))
    .then(async (args: CommandOption) => {
        const path: string = Path.resolve(args.path);
        const version: VersionPatcher = await VersionPatcher.fromJsonFile(path);
        console.log(version.toString());
    }),
);

coco.command(Command.create('major')
    .argument(Argument.create('path'))
    .then(async (args: CommandOption) => {
        const path: string = Path.resolve(args.path);
        const version: VersionPatcher = await VersionPatcher.fromJsonFile(path);
        const newVersion: VersionPatcher = version.major();
        await writeConfig(path, newVersion.toString(), Number(args.spaces));
    }),
);

coco.command(Command.create('minor')
    .argument(Argument.create('path'))
    .then(async (args: CommandOption) => {
        const path: string = Path.resolve(args.path);
        const version: VersionPatcher = await VersionPatcher.fromJsonFile(path);
        const newVersion: VersionPatcher = version.minor();
        await writeConfig(path, newVersion.toString(), Number(args.spaces));
    }),
);

coco.command(Command.create('patch')
    .argument(Argument.create('path'))
    .then(async (args: CommandOption) => {
        const path: string = Path.resolve(args.path);
        const version: VersionPatcher = await VersionPatcher.fromJsonFile(path);
        const newVersion: VersionPatcher = version.patch();
        await writeConfig(path, newVersion.toString(), Number(args.spaces));
    }),
);

coco.command(Command.create('auto')
    .argument(Argument.create('path'))
    .then(async (args: CommandOption) => {
        const path: string = Path.resolve(args.path);
        const version: VersionPatcher = await VersionPatcher.fromJsonFile(path);
        const newVersion: VersionPatcher = version.auto();
        await writeConfig(path, newVersion.toString(), Number(args.spaces));
    }),
);

export const execute = async (args: string[]): Promise<void> => {

    await coco.go(args);
};
