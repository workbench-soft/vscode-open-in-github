// Bundles the extension into out/extension.js. Pass --production to minify,
// or --watch to rebuild on each save.
const esbuild = require("esbuild");

const mode = process.argv[2];
const production = mode === "--production";

esbuild
  .build({
    entryPoints: ["./src/extension.ts"],
    outdir: "./out",
    bundle: true,
    format: "cjs",
    platform: "node",
    target: ["node16"],
    // VS Code provides `vscode`. `open` ships its xdg-open script beside its
    // own code, so the bundle loads it from node_modules.
    external: ["vscode", "open"],
    sourcemap: !production,
    minify: production,
    watch: mode === "--watch" && {
      onRebuild: (error) =>
        error
          ? console.error("watch build failed:", error)
          : console.log("watch build succeeded"),
    },
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
