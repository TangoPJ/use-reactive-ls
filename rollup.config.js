import { minify } from "rollup-plugin-esbuild-minify";
import ts from "rollup-plugin-typescript2";
import pkg from "./package.json" assert { type: "json" };

function createEntry(options) {
  const config = {
    input: "./src/index.ts",
    external: ["react"],
    output: {
      name: "use-local-storage",
      file: options.file,
      format: options.format,
      exports: "named",
      globals: {
        react: "React",
      },
    },
    plugins: [
      ts({
        check: options.format === "es",
        tsconfigOverride: {
          compilerOptions: {
            declaration: options.format === "es",
          },
        },
      }),
      minify(),
    ],
  };

  return config;
}

export default [
  createEntry({ format: "es", file: pkg.module }),
  createEntry({ format: "cjs", file: pkg.main }),
];
