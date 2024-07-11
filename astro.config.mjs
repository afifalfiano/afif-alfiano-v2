import { defineConfig } from "astro/config";
import vercelStatic from '@astrojs/vercel/static';
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
	integrations: [
		tailwind(),
		partytown({
      // Adds dataLayer.push as a forwarding-event.
      config: {
        forward: ["dataLayer.push"],
      },
    }),
	],
	output: 'static',
  adapter: vercelStatic(),
});
