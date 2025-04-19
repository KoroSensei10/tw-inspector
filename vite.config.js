import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import tailwindcss from '@tailwindcss/vite'


// eslint-disable-next-line no-undef
const __dirname = process.cwd();

export default defineConfig({
	plugins: [react(), tailwindcss()],
	build: {
		outDir: "dist",
		rollupOptions: {
			input: {
				content: resolve(__dirname, "src/content.tsx")
			},
			output: {
				entryFileNames: "content.js"
			}
		}
	}
});
