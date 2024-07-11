import { defineConfig } from "astro/config";
import vercelStatic from '@astrojs/vercel/static';
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";
import sitemap from '@astrojs/sitemap';

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
	output: 'server',
  adapter: vercel({
    isr: true,
  }),
});
