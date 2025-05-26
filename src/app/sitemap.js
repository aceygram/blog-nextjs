import { getAllPosts } from '../sanity/lib/posts';

function safeDate(dateString) {
  const date = new Date(dateString);
  return isNaN(date) ? new Date() : date;
}

export default async function sitemap() {
  const posts = await getAllPosts();
  
  const postEntries = posts.map(post => ({
    url: `https://yourdomain.com/posts/${post.slug?.current || ''}`,
    lastModified: safeDate(post._createdAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: 'https://yourdomain.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://yourdomain.com/blog',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...postEntries
  ];
}
