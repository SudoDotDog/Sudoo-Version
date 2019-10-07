/**
 * @author WMXPY
 * @namespace Version
 * @description CLI
 */

import { Argument, Coco, Command, Reverse } from "@sudoo/coco";
import * as Path from "path";
import { readConfig } from "./io";
import { Version } from "./version";

const coco = Coco.create();
coco.command(Command.create('get').argument(Argument.create('path')).then(async (args: {
    readonly path: string;
}) => {

    const version: Version = await readConfig(Path.resolve(args.path));
    console.log(version.toString());
}));

(async () => {

    await coco.go(process.argv);
})();
