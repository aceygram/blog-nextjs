// sanity/lib/posts.js
import { client } from '../client'; // or wherever your configured Sanity client is

export async function getAllPosts() {
  // Updated getAllPosts query
  const query = `*[_type == "post"] | order(publishedAt desc) [0...5]{
    _id,
    title,
    "slug": slug.current,
    "image": mainImage.asset->url,
    excerpt,
    "body": pt::text(body),
    author->{name},
    publishedAt
  }`;

  try {
    const posts = await client.fetch(query);
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug) {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    "image": mainImage.asset->url,
    body,
    excerpt,
    author->{
      name,
      "photo": image.asset->url
    },
    _createdAt,
    seo {
      metaTitle,
      metaDesc,
      focusKeywords,
      "ogImage": ogImage.asset->url
    }
  }`;

  try {
    const post = await client.fetch(query, { slug });
    return post;
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
}

