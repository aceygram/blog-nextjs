'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from "next/image";

export default function AllBlogs() {
    const [posts, setPosts] = useState([]);
    const [start, setStart] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('desc'); // or 'asc'
    const [filteredPosts, setFilteredPosts] = useState([]);
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
        // 🚫 Skip if searching
        if (searchTerm.trim()) return;

        const scrollTop = window.scrollY;
        const scrollHeight = document.body.scrollHeight;
        const clientHeight = window.innerHeight;

        if (scrollTop + clientHeight >= scrollHeight - 500) {
            fetchMorePosts();
        }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
}, [fetchMorePosts, searchTerm]); // ✅ include searchTerm

    useEffect(() => {
        let filtered = [...posts];

       if (searchTerm.trim()) {
            const regex = new RegExp(`\\b${searchTerm.toLowerCase()}`, 'i');
            filtered = filtered.filter(post =>
                regex.test(post.title.toLowerCase())
                // || regex.test(post.body?.toLowerCase() || '') // optional: search body too
            );
        }

        // Sort by date
        filtered.sort((a, b) => {
            const dateA = new Date(a.publishedAt);
            const dateB = new Date(b.publishedAt);
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });

        setFilteredPosts(filtered);
    }, [searchTerm, sortOrder, posts]);

    useEffect(() => {
        setFilteredPosts(posts);
    }, [posts]);


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
            <div className="search">
                <div className="d-flex flex-column flex-md-row mb-4 gap-3 gap-md-4">
                <input
                    type="text"
                    className="form-control m-0"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="form-select"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="desc">Newest First</option>
                    <option value="asc">Oldest First</option>
                </select>
            </div>
            </div>
            <div className="row pt-4">
                {filteredPosts.map((post) => (
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
            {/* No Articles Found */}
            {!loading && searchTerm.trim() && filteredPosts.length === 0 && (
                <div className="text-center py-3">
                    <p className="text-muted">No articles found.</p>
                </div>
            )}

            {/* Loading message (only show when NOT searching) */}
            {loading && !searchTerm.trim() && (
                <div className="text-center py-3">
                    <p className="text-muted">Loading more posts...</p>
                </div>
            )}

            {/* No More Posts (only show when NOT searching) */}
            {!searchTerm.trim() && !hasMore && posts.length > 0 && (
                <div className="text-center py-3">
                    <p className="text-muted">No more posts to load.</p>
                </div>
            )}
        </div>
    );
}