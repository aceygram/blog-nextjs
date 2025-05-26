import Link from 'next/link';
import Image from "next/image";
import { posts } from '../pages/posts/posts'; // Update with your actual path

export default function AllBlogs(){
    return (
            <div className="container-fluid p-4 p-lg-5 all-blog-posts">
                <div className="img-container mx-sm-auto">
                        <Image 
                            src="/images/all-blog-posts.svg" 
                            alt="Latest Blog Icon"
                            width={100}
                            height={100}
                            className="img-fluid"
                        />
                </div>
                <div className="row">
                    {posts.map((post) => (
                    <div key={post.id} className="col-md-6 col-lg-4 mb-4">
                        <div className="card h-100 shadow-sm border-0 overflow-hidden">
                        <img 
                            src={post.image} 
                            className="card-img-top" 
                            alt={post.title}
                            style={{ height: '200px', objectFit: 'cover' }}
                        />
                        <div className="card-body">
                            <h5 className="card-title header px-20">{post.title}</h5>
                            <p className="card-text mb-4 px-18">
                            {post.content.substring(0, 150)}... {/* Show preview */}
                            </p>
                            <Link 
                                href={`/posts/${post.id}`} 
                                className="alternate-text text-decoration-none fw-bold"
                                aria-label={`Read more about ${post.title}`}
                                >
                                Read More →
                            </Link>
                        </div>
                        <div className="card-footer">
                            <small className="text-muted">
                            By {post.author.name}
                            </small>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
    );
}