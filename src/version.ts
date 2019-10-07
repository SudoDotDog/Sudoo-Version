/**
 * @author WMXPY
 * @namespace Version
 * @description Version
 */

export class Version {

    public static create(version: string): Version {

        return new Version(version);
    }

    private readonly _major: number;
    private readonly _minor: number;
    private readonly _patch: number;

    private constructor(version: string) {

        [this._major, this._minor, this._patch] = this._init(version);
    }

    public toString(): string {

        return `${this._major}.${this._minor}.${this._patch}`;
    }

    private _init(version: string): [number, number, number] {

        const splited: number[] = version.split('.').map(Number);
        if (splited.length !== 3 || isNaN(splited[0]) || isNaN(splited[1]) || isNaN(splited[2])) {
            throw new Error(`Invalid version, should be "x.x.x", get "${version}"`);
        }

        return splited as [number, number, number];
    }
}
