import {useContext, type RuntimeWrappedContextInstance} from "@fourtune/realm-js/runtime"

import {realpath} from "@aniojs-private/node-async-sync-fs/sync"

import {getTypeOfPathSync as getTypeOfPath} from "@aniojs/node-fs-path-type"

export type AnioJsDependencies = {
	getTypeOfPath: typeof getTypeOfPath
}

/**
 * @brief Synchronously resolve a path.
 * @description
 * Synchronously resolves the path `path`.
 * If the path resolves to a directory, a slash at the end in the
 * resulting path is ensured.
 * This function throws if `path` does not exist.
 * @param path The path to be resolved.
 */
export function implementation(
	wrapped_context: RuntimeWrappedContextInstance,
	dependencies: AnioJsDependencies,
	inputPath: string
) : string {
	const context = useContext(wrapped_context, 0)

	context.log.debug(`resolving "${inputPath}"`)

	const pathType = dependencies.getTypeOfPath(inputPath)

	if (pathType === "nonExisting") {
		throw new Error(
			`Path '${inputPath}' does not exist.`
		)
	}

	let resolvedPath = realpath(inputPath)

	if (resolvedPath.endsWith("/")) {
		resolvedPath = resolvedPath.slice(0, -1)
	}

	if (
	    pathType === "regularDir" ||
	    pathType === "linkToDir"
	    ) {
		return `${resolvedPath}/`
	}

	return resolvedPath
}
