import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import envCompatible from "vite-plugin-env-compatible";
// https://vitejs.dev/config/
export default defineConfig({
	envPrefix: "REACT_",
	plugins: [react(), eslint(), envCompatible()],
	define: {
		"process.env.API_URL": JSON.stringify(process.env.API_URL),
		"process.env.PHONE_NUMBER": JSON.stringify(process.env.REACT_PHONE_NUMBER),
	},
});
