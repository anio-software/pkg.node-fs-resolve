import {
	resolvePath,
	resolvePathSync
} from "../products/project/dist/default/index.mjs"

console.log(
	await resolvePath("."),
	resolvePathSync(".")
)
