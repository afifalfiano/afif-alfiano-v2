import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/static';
import opengraphImages, { presets } from "astro-opengraph-images";

// https://astro.build/config
export default defineConfig({
	integrations: [
		tailwind(),
    opengraphImages({
      options: {
        fonts: [
          {
            name: "Roboto",
            weight: 400,
            style: "normal",
            data: fs.readFileSync("node_modules/@fontsource/roboto/files/roboto-latin-400-normal.woff"),
          },
        ],
      },
      render: presets.tailwind,
    }),
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
