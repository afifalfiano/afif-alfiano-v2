import rss from '@astrojs/rss';
import { getCollection } from "astro:content";

export async function GET(context) {
  const localPosts = await getCollection('post', ({ data }) => data.status === 'published');

  const localItems = localPosts.map((post) => ({
    title: post.data.title,
    pubDate: new Date(post.data.dateFormatted),
    description: post.data.description,
    link: `/post/${post.slug}/`,
  }));

  let mediumItems = [];
  try {
    const apiKey = import.meta.env.RSS2JSON_API_KEY;
    const res = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@afifalfiano&api_key=${apiKey}&count=100`
    );
    const data = await res.json();
    if (data.status === 'ok') {
      mediumItems = data.items.map((item) => ({
        title: item.title,
        pubDate: new Date(item.pubDate),
        description: item.description.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 300),
        link: item.link,
      }));
    }
  } catch {
    // Medium fetch failed — RSS still works with local posts only
  }

  const allItems = [...localItems, ...mediumItems].sort(
    (a, b) => b.pubDate - a.pubDate
  );

  return rss({
    title: 'Afif Alfiano',
    description: 'A frontend developer from Yogyakarta, Indonesia',
    site: context.site,
    items: allItems,
  });
}