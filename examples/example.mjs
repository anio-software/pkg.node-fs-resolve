import {
	resolvePath,
	resolvePathSync
} from "../dist/default/index.mjs"

console.log(
	await resolvePath("."),
	resolvePathSync(".")
)
