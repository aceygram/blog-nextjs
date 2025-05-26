// sanity/utils.js
import client from './client'; // re-use the existing client

export async function fetchPosts() {
  const query = `*[_type == "post"]{
    title,
    "slug": slug.current,
    "image": mainImage.asset->url,
    "author": author->{name, "photo": image.asset->url},
    publishedAt,
    body
  } | order(publishedAt desc)`;

  return await client.fetch(query);
}

export async function fetchPostBySlug(slug) {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    "image": mainImage.asset->url,
    "author": author->{name, "photo": image.asset->url},
    publishedAt,
    body
  }`;

  return await client.fetch(query, { slug });
}
