import {
	type EnkoreJSRuntimeContextOptions,
	createContext
} from "@anio-software/enkore.js-runtime"

import {realpath} from "@anio-software/pkg-private.node-consistent-fs/async"
//>import {realpath} from "@anio-software/pkg-private.node-consistent-fs/sync"

import {
	type ValidPathType,
	convertPathTypeToHumanReadable
} from "@anio-software/pkg.node-fs-path-type"

import type {getTypeOfPath} from "@anio-software/pkg.node-fs-path-type"
//>import type {getTypeOfPathSync as getTypeOfPath} from "@anio-software/pkg.node-fs-path-type"

export type __EnkoreFunctionDependencies = {
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
export async function __implementation(
//>export function __implementationSync(
	contextOptions: EnkoreJSRuntimeContextOptions,
	dependencies: __EnkoreFunctionDependencies,
	inputPath: string,
	expectedPathType?: ValidPathType|ValidPathType[]
) : Promise<string> {
//>) : string {
	const context = createContext(contextOptions, 0)

	context.log.debug(`resolving "${inputPath}"`)

	const pathType = await dependencies.getTypeOfPath(inputPath)
//>	const pathType = dependencies.getTypeOfPath(inputPath)

	if (pathType === "nonExisting") {
		throw new Error(`Path '${inputPath}' does not exist.`)
	} else if (pathType === "error" || pathType === "link:error") {
		throw new Error(`Failed to get type of path '${inputPath}'.`)
	}

	if (expectedPathType) {
		const validPathTypes = Array.isArray(
			expectedPathType
		) ? expectedPathType : [expectedPathType]

		if (!validPathTypes.includes(pathType)) {
			throw new Error(
				`The path '${inputPath}' is not of a valid type.\n\n` +
				`Valid type(s): \n\n` +
				validPathTypes.map(t => {
					return `    - ${convertPathTypeToHumanReadable(t)} (${t})\n`
				}).join("") +
				`\nActual type: ${convertPathTypeToHumanReadable(pathType)} (${pathType})\n`
			)
		}
	}

	let resolvedPath = await realpath(inputPath)
//>	let resolvedPath = realpath(inputPath)

	if (resolvedPath.endsWith("/")) {
		resolvedPath = resolvedPath.slice(0, -1)
	}

	if (
	    pathType === "dir:regular" ||
	    pathType === "link:dir"
	    ) {
		return `${resolvedPath}/`
	}

	return resolvedPath
}
