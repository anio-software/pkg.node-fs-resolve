import {createContext} from "@fourtune/realm-js/v0/runtime"

// vvv--- types needed for implementation
import type {PathType} from "@aniojs/node-fs-path-type"
// ^^^--- types needed for implementation

import {resolvePathSyncFactory as factory} from "#~synthetic/user/export/resolvePathSyncFactory.mts"

const fn = factory(createContext())

/**
 * @brief Synchronously resolve a path.
 * @description
 * Synchronously resolves the path `path`.
 * If the path resolves to a directory, a slash at the end in the
 * resulting path is ensured.
 * This function throws if `path` does not exist.
 * @param path The path to be resolved.
 * @param expectedPathType The type of path expected (optional).
 */
export function resolvePathSync(inputPath: string, expectedPathType?: PathType|PathType[]) : string {
	return fn(inputPath, expectedPathType)
}
