/**
 * @author WMXPY
 * @namespace Version
 * @description Version
 */

import { Next } from "./declare";

export class Version {

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

    private readonly _next?: Next;

    private constructor(major: number, minor: number, patch: number, next: Next = 'patch') {

        [this._major, this._minor, this._patch] = [major, minor, patch];

        this._next = next;
    }

    public get next(): Next | undefined {
        return this._next;
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

    public toString(): string {

        return `${this._major}.${this._minor}.${this._patch}`;
    }
}
