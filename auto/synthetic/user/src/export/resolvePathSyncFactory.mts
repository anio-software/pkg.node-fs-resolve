import {implementation, type AnioJsDependencies} from "#~synthetic/async.sync/resolvePathSync.mts"
import type {RuntimeWrappedContextInstance} from "@fourtune/realm-js/runtime"
import {getProject} from "@fourtune/realm-js/v0/project"

// vvv dependencies declared via AnioJsDependencies type
import {getTypeOfPathSyncFactory} from "@aniojs/node-fs-path-type"
// ^^^ dependencies declared via AnioJsDependencies type

/**
 * @brief Synchronously resolve a path.
 * @description
 * Synchronously resolves the path `path`.
 * If the path resolves to a directory, a slash at the end in the
 * resulting path is ensured.
 * This function throws if `path` does not exist.
 * @param path The path to be resolved.
 */
declare function resolvePathSync(
	inputPath: string
) : string

/**
 * @brief
 * Create an instance of the function 'resolvePathSync'.
 *
 * @param user
 * Options object (see @fourtune/realm-js/v0/runtime) or an already
 * created context with createContext().
 * This parameter is optional.
 *
 * @return
 * An instance of the function 'resolvePathSync'.
 */
export function resolvePathSyncFactory(context: RuntimeWrappedContextInstance) : typeof resolvePathSync {
	const dependencies : AnioJsDependencies = {
		getTypeOfPath: getTypeOfPathSyncFactory(context)
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

	return function resolvePathSync(inputPath: string) : string {
		return implementation(local_context, dependencies, inputPath)
	}
}
