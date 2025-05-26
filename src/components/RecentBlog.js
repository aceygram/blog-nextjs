import { useEffect, useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from '../sanity/lib/posts';

export default function RecentBlog({ 
  sectionClassName = "container-fluid home-blog", 
  columnClassName = "col-md-4", 
  rowClass = "row",
  postToShow = 3
}) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts();
        console.log('Fetched posts in RecentBlog:', data); // Debugging
        setPosts(data || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);
      }
    };
    fetchPosts();
  }, []);

  const recentPosts = posts.slice(0, postToShow);

  return (
    <section className={`${sectionClassName} py-5`}>
      {/* Section Header */}
      <div className="text-center mb-5 mb-lg-5">
        <div className="img-container mx-auto mb-3 ps-4">
          <Image 
            src="/images/latest-primary.svg" 
            alt="Latest Blog Icon"
            width={100}
            height={100}
            className="img-fluid"
            priority // Add priority for above-the-fold images
          />
        </div>
        <p className="text-muted p-1 p-lg-4 header">Discover my most recent articles</p>
      </div>

      {/* Blog Posts Grid */}
      <div className={`${rowClass} g-4`}>
        {recentPosts.map((post) => (
          <div className={`${columnClassName} mb-4`} key={post._id}>
            <div className="card h-100 shadow-sm border-0 overflow-hidden">
              <div className="card-body p-0 d-flex flex-column">
                <div className="img-container" style={{ height: '200px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                  {post.image && (
                    <Image
                      src={post.image}
                      alt={post.title || 'Blog post image'}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-fit-cover"
                      quality={80}
                      priority={false}
                    />
                  )}
                </div>
                <div className="p-4 flex-grow-1 d-flex flex-column">
                  <h3 className="card-title h5 mb-3 px-20 header">
                    {post.title || 'Untitled Post'}
                  </h3>
                  <p className="card-text mb-4 flex-grow-1 px-18">
                    {(post.body || '').substring(0, 100)}...
                  </p>
                  <Link 
                    href={`/posts/${post.slug}`}  // Changed from post.slug.current
                    className="alternate-text text-decoration-none fw-bold"
                    aria-label={`Read more about ${post.title}`}
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-3 mt-lg-5">
        <Link 
          href="/blog" 
          className="btn btn-outline-success blog"
          style={{ minWidth: '200px' }}
        >
          View All Blog Posts
        </Link>
      </div>
    </section>
  );
}