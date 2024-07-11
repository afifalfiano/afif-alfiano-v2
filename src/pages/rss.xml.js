import rss from '@astrojs/rss';
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = await getCollection('post');
  return rss({
    title: 'Afif Alfiano',
    description: 'A frontend developer from Yogyakarta, Indonesia',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.dateFormatted,
      description: post.data.description,
      link: `/post/${post.slug}/`,
    })),
  });
}