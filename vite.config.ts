import { defineConfig } from "vite"
import dts from "vite-plugin-dts"
import wasm from "vite-plugin-wasm";

export default defineConfig({
    build: {
        lib: {
            entry: "src/index.ts",
            fileName: "index",
            formats: ["es"],
        },
    },
    plugins: [
        wasm(),
        dts({
            copyDtsFiles: true,
        }),
    ],
});
