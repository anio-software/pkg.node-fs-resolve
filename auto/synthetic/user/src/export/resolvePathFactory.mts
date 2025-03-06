import {implementation, type AnioJsDependencies} from "#~synthetic/async.sync/resolvePath.mts"
import type {RuntimeWrappedContextInstance} from "@fourtune/realm-js/runtime"
import {getProject} from "@fourtune/realm-js/v0/project"

// vvv dependencies declared via AnioJsDependencies type
import {getTypeOfPathFactory} from "@aniojs/node-fs-path-type"
// ^^^ dependencies declared via AnioJsDependencies type

// vvv--- types needed for implementation
import type {PathType} from "@aniojs/node-fs-path-type"
/* couldn't find a user defined type named 'Promise' at the top level */
// ^^^--- types needed for implementation

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
declare function resolvePath(
	inputPath: string,
	expectedPathType?: PathType|PathType[]
) : Promise<string>

/**
 * @brief
 * Create an instance of the function 'resolvePath'.
 *
 * @param user
 * Options object (see @fourtune/realm-js/v0/runtime) or an already
 * created context with createContext().
 * This parameter is optional.
 *
 * @return
 * An instance of the function 'resolvePath'.
 */
export function resolvePathFactory(context: RuntimeWrappedContextInstance) : typeof resolvePath {
	const dependencies : AnioJsDependencies = {
		getTypeOfPath: getTypeOfPathFactory(context)
	}

	const project = getProject()
	const local_context : RuntimeWrappedContextInstance = {
		...context,
		_package: {
			name: project.package_json.name,
			version: project.package_json.version,
			author: project.package_json.author,
			license: project.package_json.license
		}
	}

	return async function resolvePath(inputPath: string, expectedPathType?: PathType|PathType[]) : Promise<string> {
		return await implementation(local_context, dependencies, inputPath, expectedPathType)
	}
}
