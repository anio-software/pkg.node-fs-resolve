import {generateFactoryFiles} from "@fourtune/realm-js/v0/autogenerate"

export default {
	realm: {
		name: "js",
		type: "package",

		options: {
			runtime: "node"
		}
	},

	autogenerate: {
		...generateFactoryFiles({
			source_file: "src/__resolvePathXXX.as.mts",
			export_name: "resolvePathXXX",
			destination: "src/export"
		})
	}
}
