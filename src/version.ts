/**
 * @author WMXPY
 * @namespace Version
 * @description Version
 */

export class Version {

    public static create(version: string): Version {

        const splited: number[] = version.split('.').map(Number);
        if (splited.length !== 3 || isNaN(splited[0]) || isNaN(splited[1]) || isNaN(splited[2])) {
            throw new Error(`Invalid version structure, should be "x.x.x", but got "${version}".`);
        }

        return new Version(splited[0], splited[1], splited[2]);
    }

    private readonly _major: number;
    private readonly _minor: number;
    private readonly _patch: number;

    private constructor(major: number, minor: number, patch: number) {

        [this._major, this._minor, this._patch] = [major, minor, patch];
    }

    public major(): Version {

        return new Version(this._major + 1, this._minor, this._patch);
    }

    public minor(): Version {

        return new Version(this._major, this._minor + 1, this._patch);
    }

    public patch(): Version {

        return new Version(this._major, this._minor, this._patch + 1);
    }

    public toString(): string {

        return `${this._major}.${this._minor}.${this._patch}`;
    }
}
