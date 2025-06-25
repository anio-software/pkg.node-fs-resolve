import {
	type EnkoreJSRuntimeContextOptions,
	createContext
} from "@anio-software/enkore.js-runtime"

import {realpath} from "@aniojs-private/node-async-sync-fs/async"
//>import {realpath} from "@aniojs-private/node-async-sync-fs/sync"

import type {PathType} from "@anio-software/pkg.node-fs-path-type"

import {getTypeOfPath} from "@anio-software/pkg.node-fs-path-type"
//>import {getTypeOfPathSync as getTypeOfPath} from "@anio-software/pkg.node-fs-path-type"

export type AnioJsDependencies = {
	getTypeOfPath: typeof getTypeOfPath
}

/**
 * @brief Asynchronously resolve a path.
//> * @brief Synchronously resolve a path.
 * @description
 * Asynchronously resolves the path `path`.
//> * Synchronously resolves the path `path`.
 * If the path resolves to a directory, a slash at the end in the
 * resulting path is ensured.
 * This function throws if `path` does not exist.
 * @param path The path to be resolved.
 * @param expectedPathType The type of path expected (optional).
 */
export async function implementation(
//>export function implementation(
	contextOptions: EnkoreJSRuntimeContextOptions,
	dependencies: AnioJsDependencies,
	inputPath: string,
	expectedPathType?: PathType|PathType[]
) : Promise<string> {
//>) : string {
	const context = createContext(contextOptions, 0)

	context.log.debug(`resolving "${inputPath}"`)

	const pathType = await dependencies.getTypeOfPath(inputPath)
//>	const pathType = dependencies.getTypeOfPath(inputPath)

	if (pathType === "nonExisting") {
		throw new Error(
			`Path '${inputPath}' does not exist.`
		)
	}

	if (expectedPathType) {
		const validPathTypes = Array.isArray(
			expectedPathType
		) ? expectedPathType : [expectedPathType]

		if (!validPathTypes.includes(pathType)) {
			throw new Error(
				`Path is not of expected type.`
			)
		}
	}

	let resolvedPath = await realpath(inputPath)
//>	let resolvedPath = realpath(inputPath)

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
