/**
 * @author WMXPY
 * @namespace Version
 * @description Version
 */

import { Next } from "./declare";
import { readConfig, readConfigSync } from "./io";

export class Version {

    public static async fromJson(path: string): Promise<Version> {

        return await readConfig(path);
    }

    public static fromJsonSync(path: string): Version {

        return readConfigSync(path);
    }

    public static create(version: string, next: Next): Version {

        const splited: number[] = version.split('.').map(Number);
        if (splited.length !== 3 || isNaN(splited[0]) || isNaN(splited[1]) || isNaN(splited[2])) {
            throw new Error(`Invalid version structure, should be "x.x.x", but got "${version}".`);
        }

        return new Version(splited[0], splited[1], splited[2], next);
    }

    private readonly _major: number;
    private readonly _minor: number;
    private readonly _patch: number;

    private readonly _next: Next;

    private constructor(major: number, minor: number, patch: number, next: Next = 'patch') {

        [this._major, this._minor, this._patch] = [major, minor, patch];

        this._next = next;
    }

    public get next(): Next | undefined {
        return this._next;
    }

    public get majorVersion(): number {
        return this._major;
    }
    public get minorVersion(): number {
        return this._minor;
    }
    public get patchVersion(): number {
        return this._patch;
    }

    public auto(): Version {

        if (this._next.toLowerCase() === 'major') {
            return this.major();
        }

        if (this._next.toLowerCase() === 'minor') {
            return this.minor();
        }

        return this.patch();
    }

    public major(): Version {

        return new Version(this._major + 1, 0, 0);
    }

    public minor(): Version {

        return new Version(this._major, this._minor + 1, 0);
    }

    public patch(): Version {

        return new Version(this._major, this._minor, this._patch + 1);
    }

    public compare(version: Version): 1 | 0 | -1 {

        if (this._major > version.majorVersion) {
            return 1;
        }
        if (this._major < version.majorVersion) {
            return -1;
        }

        if (this._minor > version.minorVersion) {
            return 1;
        }
        if (this._minor < version.minorVersion) {
            return -1;
        }

        if (this._patch > version.patchVersion) {
            return 1;
        }
        if (this._patch < version.patchVersion) {
            return -1;
        }

        return 0;
    }

    public isGreaterThan(version: Version): boolean {

        return this.compare(version) === 1;
    }

    public isSmallerThan(version: Version): boolean {

        return this.compare(version) === -1;
    }

    public equals(version: Version): boolean {

        return this.compare(version) === 0;
    }

    public hash(): string {

        return this.toString();
    }

    public toString(): string {

        return `${this._major}.${this._minor}.${this._patch}`;
    }
}
