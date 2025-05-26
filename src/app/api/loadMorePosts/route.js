// app/api/loadMorePosts/route.js
import { client } from '@/sanity/lib/client';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const start = parseInt(searchParams.get('start')) || 0;
  const limit = parseInt(searchParams.get('limit')) || 6;

  try {
    const posts = await client.fetch(
      `*[_type == "post"] | order(publishedAt desc) [${start}...${start + limit}]{
        _id,
        title,
        "slug": slug.current,
        "image": mainImage.asset->url,
        excerpt,
        "body": pt::text(body), // Convert Portable Text to string
        author->{name},
        publishedAt
      }`
    );
    
    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to load posts' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}