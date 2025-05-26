import Link from "next/link";
import { posts } from "@/pages/posts/posts"; // Update path based on your folder structure
import Image from "next/image";

export default function RecentBlog({ 
  sectionClassName = "container-fluid home-blog", 
  columnClassName = "col-md-4", 
  rowClass = "row",
  postToShow 
}) {
  const recentPosts = posts.slice(0, postToShow); // Only show 3 latest posts

  return (
    <section className={`${sectionClassName} py-5`}>
      {/* Section Header */}
      <div className="text-center mb-4 mb-lg-5">
        <div className="img-container mx-auto mb-3 ps-4">
          <Image 
            src="/images/latest-primary.svg" 
            alt="Latest Blog Icon"
            width={100}
            height={100}
            className="img-fluid"
          />
        </div>
        <p className="text-muted p-1 p-lg-4 header">Discover my most recent articles</p>
      </div>

      {/* Blog Posts Grid */}
      <div className={`${rowClass} g-4`}>
        {recentPosts.map((post) => (
          <div className={`${columnClassName} mb-4`} key={post.id}>
            <div className="card h-100 shadow-sm border-0 overflow-hidden">
              <div className="card-body p-0 d-flex flex-column">
                <div className="img-container" style={{ height: '200px', width: '100%', overflow: 'hidden' }}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={200}
                    className="img-fluid w-100 h-100 object-fit-cover"
                  />
                </div>
                <div className="p-4 flex-grow-1 d-flex flex-column">
                  <h3 className="card-title h5 mb-3 px-20 header">{post.title}</h3>
                  <p className="card-text mb-4 flex-grow-1 px-18">
                    {post.content.slice(0, 100)}...
                  </p>
                  <Link 
                    href={`/posts/${post.id}`} 
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