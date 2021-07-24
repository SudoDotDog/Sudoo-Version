/**
 * @author WMXPY
 * @namespace Version
 * @description Version
 */

import { SemanticVersion } from "@sudoo/semantic-version";
import { Next, VersionFile } from "./declare";
import { readConfig, readConfigSync } from "./io";

export class VersionPatcher {

    public static async fromJsonFile(path: string): Promise<VersionPatcher> {

        const versionFile: VersionFile = await readConfig(path);
        return new VersionPatcher(SemanticVersion.fromString(versionFile.version), versionFile.next);
    }

    public static fromJsonFileSync(path: string): VersionPatcher {

        const versionFile: VersionFile = readConfigSync(path);
        return new VersionPatcher(SemanticVersion.fromString(versionFile.version), versionFile.next);
    }

    public static fromString(version: string, next: Next): VersionPatcher {

        const semanticVersion: SemanticVersion = SemanticVersion.fromString(version);

        return new VersionPatcher(semanticVersion, next);
    }

    private readonly _version: SemanticVersion;

    private readonly _next: Next;

    private constructor(version: SemanticVersion, next: Next = 'patch') {

        this._version = version;

        this._next = next;
    }

    public get next(): Next | undefined {
        return this._next;
    }

    public get version(): SemanticVersion {
        return this._version;
    }

    public auto(): VersionPatcher {

        if (this._next.toLowerCase() === 'major') {
            return this.major();
        }

        if (this._next.toLowerCase() === 'minor') {
            return this.minor();
        }

        return this.patch();
    }

    public major(): VersionPatcher {

        return new VersionPatcher(this._version.major());
    }

    public minor(): VersionPatcher {

        return new VersionPatcher(this._version.minor());
    }

    public patch(): VersionPatcher {

        return new VersionPatcher(this._version.patch());
    }

    public compare(version: VersionPatcher): 1 | 0 | -1 {

        return this._version.compare(version._version);
    }

    public isGreaterThan(version: VersionPatcher): boolean {

        return this.compare(version) === 1;
    }

    public isSmallerThan(version: VersionPatcher): boolean {

        return this.compare(version) === -1;
    }

    public equals(version: VersionPatcher): boolean {

        return this.compare(version) === 0;
    }

    public hash(): string {

        return this.toString();
    }

    public toString(): string {

        return this._version.toString();
    }
}
