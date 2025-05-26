'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from "next/image";

export default function AllBlogs() {
    const [posts, setPosts] = useState([]);
    const [start, setStart] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const limit = 6; // Load 6 posts at a time
    const hasFetchedRef = useRef(false);

    const fetchMorePosts = useCallback(async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const res = await fetch(`/api/loadMorePosts?start=${start}&limit=${limit}`);
            const newPosts = await res.json();

            if (newPosts.length === 0) {
                setHasMore(false);
            } else {
                setPosts(prev => [...prev, ...newPosts]);
                setStart(prev => prev + limit);
            }
        } catch (err) {
            console.error("Error loading posts:", err);
        } finally {
            setLoading(false);
        }
    }, [start, loading, hasMore]);

    useEffect(() => {
        if (!hasFetchedRef.current) {
            fetchMorePosts();
            hasFetchedRef.current = true;
        }
    }, [fetchMorePosts]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const scrollHeight = document.body.scrollHeight;
            const clientHeight = window.innerHeight;

            if (scrollTop + clientHeight >= scrollHeight - 500) {
                fetchMorePosts();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [fetchMorePosts]);

    return (
        <div className="container-fluid p-4 pt-5 mt-lg-5 p-lg-5 all-blog-posts">
            <div className="img-container mx-sm-auto mb-5">
                <Image 
                    src="/images/all-blog-posts.svg" 
                    alt="Latest Blog Icon"
                    width={100}
                    height={100}
                    className="img-fluid"
                />
            </div>
            <div className="row pt-4">
                {posts.map((post) => (
                    <div key={post._id} className="col-md-6 col-lg-4 mb-4">
                        <div className="card h-100 shadow-sm border-0 overflow-hidden">
                            <Image 
                                src={post.image} 
                                className="card-img-top" 
                                alt={post.title}
                                width={400}  // Set appropriate width
                                height={200} // Set appropriate height
                                style={{ height: '200px', objectFit: 'cover' }}
                            />
                            <div className="card-body">
                                <h5 className="card-title header px-20">{post.title}</h5>
                                <p className="card-text mb-4 px-18">
                                    {(post.body || '').substring(0, 150)}...
                                </p>
                                <Link 
                                    href={`/posts/${post.slug}`} 
                                    className="alternate-text text-decoration-none fw-bold"
                                    aria-label={`Read more about ${post.title}`}
                                >
                                    Read More →
                                </Link>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">
                                    By {post.author?.name || 'Unknown'}
                                </small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {loading && (
                <div className="text-center py-3">
                    <p className="text-muted">Loading more posts...</p>
                </div>
            )}
            {!hasMore && posts.length > 0 && (
                <div className="text-center py-3">
                    <p className="text-muted">No more posts to load.</p>
                </div>
            )}
        </div>
    );
}