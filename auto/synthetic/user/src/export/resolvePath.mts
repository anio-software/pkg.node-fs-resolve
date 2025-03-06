import {createContext} from "@fourtune/realm-js/v0/runtime"

// vvv--- types needed for implementation
import type {PathType} from "@aniojs/node-fs-path-type"
/* couldn't find a user defined type named 'Promise' at the top level */
// ^^^--- types needed for implementation

import {resolvePathFactory as factory} from "#~synthetic/user/export/resolvePathFactory.mts"

/**
 * @brief Asynchronously resolve a path.
 * @description
 * Asynchronously resolves the path `path`.
 * If the path resolves to a directory, a slash at the end in the
 * resulting path is ensured.
 * This function throws if `path` does not exist.
 * @param path The path to be resolved.
 * @param expectedPathType The type of path expected (optional).
 */
export async function resolvePath(inputPath: string, expectedPathType?: PathType|PathType[]) : Promise<string> {
	const __fnImplementation = factory(createContext())

	return await __fnImplementation(inputPath, expectedPathType)
}
