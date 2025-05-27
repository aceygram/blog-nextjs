// app/(main)/posts/[slug]/page.js
import { getPostBySlug, getAllPosts } from '../../../../sanity/lib/posts';
import Link from 'next/link';
import RecentBlog from '../../../../components/RecentBlog';
import Subscribe from '../../../../components/Subscribe';
import { PortableText } from '@portabletext/react';
import Image from 'next/image'; // Added import

// function formatContent(content) {
//   const sentences = content.split(/(?<=[.!?])\s+/);
//   const paragraphs = [];
//   let currentParagraph = [];
//   let wordCount = 0;

//   for (let sentence of sentences) {
//     const wordsInSentence = sentence.split(/\s+/).length;

//     if (wordCount + wordsInSentence > 150 && currentParagraph.length > 0) {
//       let paragraph = currentParagraph.join(' ');
//       paragraph = paragraph.charAt(0).toUpperCase() + paragraph.slice(1);
//       paragraphs.push(paragraph);
//       currentParagraph = [sentence];
//       wordCount = wordsInSentence;
//     } else {
//       currentParagraph.push(sentence);
//       wordCount += wordsInSentence;
//     }
//   }

//   if (currentParagraph.length > 0) {
//     let paragraph = currentParagraph.join(' ');
//     paragraph = paragraph.charAt(0).toUpperCase() + paragraph.slice(1);
//     paragraphs.push(paragraph);
//   }

//   return paragraphs;
// }

export async function generateMetadata({ params }) {
  if (!params?.slug) {
    return {
      title: 'Post not found',
    };
  }
  
   const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
      alternates: {
        canonical: '/blog'
      }
    };
  }

  // Extract plain text from Portable Text for description
  const plainText = post.body
    ? post.body
        .filter(block => block._type === 'block')
        .map(block => block.children.map(child => child.text).join(' '))
        .join('\n')
        .substring(0, 160)
    : '';

  const metaTitle = post.seo?.metaTitle || post.title;
  const metaDesc = post.seo?.metaDesc || post.excerpt || plainText;
  const ogImage = post.seo?.ogImage || post.image;

  return {
    title: metaTitle,
    description: metaDesc,
    keywords: post.seo?.focusKeywords?.join(', ') || '',
    alternates: {
      canonical: `/posts/${post.slug.current}`
    },
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url: `/posts/${post.slug.current}`,
      siteName: `Tone Elizabeth's Blog`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title
        }
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: post._createdAt,
      authors: [post.author.name]
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDesc,
      images: [ogImage],
      creator: '@yourtwitterhandle'
    }
  };
}

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function addPostJsonLd(post) {
  return {
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.seo?.metaDesc || post.excerpt,
      "image": post.seo?.ogImage || post.image,
      "author": {
        "@type": "Person",
        "name": post.author.name,
      },
      "datePublished": post._createdAt,
      "publisher": {
        "@type": "Organization",
        "name": "Tone Elizabeth's Blog",
        "logo": {
          "@type": "ImageObject",
          "url": "https://yourdomain.com/logo.png"
        }
      }
    })
  };
}

export default async function BlogPost({ params }) {
  if (!params?.slug) {
    return <div>Post not found</div>;
  }
  
  const { slug } = params;

  const post = await getPostBySlug(slug);
  const allPosts = await getAllPosts();

  if (!post) {
    return (
      <div className="container post-not-found text-center">
        <h1 className='header'>Post not found</h1>
        <Link href="/blog" className="btn btn-outline-success subscribe mt-3">
          Back to All Posts
        </Link>
      </div>
    );
  }

  const shuffledRelated = shuffleArray(allPosts.filter(p => p.slug.current !== slug)).slice(0, 3);

  const components = {
    block: {
      normal: ({ children }) => (
        <p style={{ 
          textIndent: '40px',
          marginBottom: '1.1rem',
          lineHeight: '1.7',
          fontWeight: 300
        }}>
          {children}
        </p>
      ),
      image: ({ value }) => (
        <Image
          src={value.asset.url}
          alt={value.alt || 'Post image'}
          width={800}
          height={500}
          layout="responsive"
        />
      ),
    },
  };

  return (
    <>
      <div className="container-fluid blog-page px-3 p-md-5">
        <Link href="/blog" className="btn btn-outline-secondary mb-4">← Back to All Posts</Link>

        <div className="container-fluid p-0 py-md-1 center-content row">
          <article className="blog-post p-0 py-md-1 col-12 col-lg-8">
            <h1 className="mb-3 display-4 header fw-bold">{post.title}</h1>
            
            <div className="d-flex align-items-center mb-4">
              {post.author?.photo && (
                <Image 
                  src={post.author.photo}
                  alt={post.author.name}
                  className="rounded-circle me-3 blog-page-img"
                  width={70}
                  height={70}
                  style={{ objectFit: 'cover' }}
                />
              )}
              <div>
                <p className="mb-0 fw-bold">{post.author.name}</p>
                <small className="text-muted">
                  Published on {new Date(post._createdAt).toLocaleDateString()}
                </small>
              </div>
            </div>

            <Image 
              src={post.image} 
              alt={post.title}
              className="img-fluid rounded mb-4"
              width={1200}
              height={630}
              style={{ maxHeight: '500px', width: '100%', objectFit: 'cover' }}
            />

            <div className="blog-content px-20 ps-1">
              <PortableText value={post.body} components={components} />
            </div>
          </article>

          <div className="d-none d-lg-block col-lg-4 p-0 ps-4">
            <RecentBlog postToShow={3} sectionClassName="container home-blog main-blog-recent" columnClassName="col-12" rowClass='d-flex flex-column'/>
          </div>
        </div>

        <div className="mt-5 pt-4 border-top">
          <h4 className="mb-3 header">More Posts</h4>
          <div className="row">
            {shuffledRelated.map(relatedPost => (
              <div key={relatedPost._id} className="col-md-4 mb-3">
                <div className="card h-100">
                  <Image 
                    src={relatedPost.image} 
                    className="card-img-top" 
                    alt={relatedPost.title}
                    width={400}
                    height={200}
                    style={{ height: '150px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title header">{relatedPost.title}</h5>
                    <Link 
                      href={`/posts/${relatedPost.slug}`} 
                      className="alternate-text text-decoration-none fw-bold"
                    >
                      Read Post →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Subscribe sectionClassName='light-bg primary-text my-0 alternate p-5'/>
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={addPostJsonLd(post)}
      />
    </>
  );
}