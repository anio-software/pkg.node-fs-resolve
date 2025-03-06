import {createContext} from "@fourtune/realm-js/v0/runtime"

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
 */
export function resolvePathSync(inputPath: string) : string {
	return fn(inputPath)
}
