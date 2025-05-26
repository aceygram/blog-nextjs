// app/api/recentPosts/route.js
import { client } from '../../../sanity/lib/client';

export async function GET() {
  try {
    const posts = await client.fetch(
      `*[_type == "post"] | order(publishedAt desc) [0...3]{
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
    return new Response(JSON.stringify({ error: 'Failed to fetch recent posts' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
