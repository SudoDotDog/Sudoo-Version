/**
 * @author WMXPY
 * @namespace Version
 * @description Declare
 */

export type Next = 'major' | 'minor';

export type VersionFile = {

    readonly version: string;
    readonly next?: Next;
};
