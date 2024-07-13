import { defineCollection, z } from "astro:content";

const postCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		dateFormatted: z.string(),
		coverImage: z.string(),
		wordCount: z.number(),
		author: z.object({
			name: z.string(),
			picture: z.string(),
		}),
		ogImage: z.object({
			url: z.string(),
		}),
		status: z.string()
	}),
});

export const collections = {
	post: postCollection,
};
