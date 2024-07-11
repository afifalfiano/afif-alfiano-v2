import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/static';

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
    (await import("@playform/compress")).default(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date('2024-07-11'),
    }),
	],
  site: 'https://afifalfiano.my.id',
	output: 'static',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
