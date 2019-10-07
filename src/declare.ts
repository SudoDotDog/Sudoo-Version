/**
 * @author WMXPY
 * @namespace Version
 * @description Declare
 */

export type Next = 'major' | 'minor' | 'patch';

export type VersionFile = {

    readonly version: string;
    readonly next: Next;
};
