import { defineConfig } from "cf/config";

// Static site: no Worker code. `npm run build` outputs ./dist and
// `cf deploy ./dist` publishes it as an assets-only Worker.
export default defineConfig({
	worker: {
		// Must match the project name in the Cloudflare dashboard.
		name: "zaatarlille",
		compatibilityDate: "2026-09-01",
	},
});
