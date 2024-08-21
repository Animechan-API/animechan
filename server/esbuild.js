import * as esbuild from "esbuild";

await esbuild.build({
	entryPoints: ["server.ts"],
	bundle: true,
	format: "esm",
	platform: "node",
	minify: true,
	target: ["node19.9"],
	packages: "external",
	outdir: "dist",
	allowOverwrite: true,
});
