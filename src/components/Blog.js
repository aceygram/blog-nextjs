import Link from 'next/link';
import { useEffect, useState } from 'react';

// Sample blog posts (you can replace this with a CMS or API)
const posts = [
  { id: 1, title: 'My First Blog Post', content: 'This is my first blog post', image: '/images/scenery.jpg'},
  { id: 2, title: 'Next.js and Bootstrap', content: 'Learn how to use Next.js with Bootstrap.', image: '/images/scenery.jpg' },
  { id: 3, title: 'Next.js and Bootstrap', content: 'Learn how to use Next.js with Bootstrap.', image: '/images/scenery.jpg' },
];

export default function Blog (){
    return (
        <div className="container home-blog d-flex flex-column">
            <div className="img-container align-self-center">
                <img src="images/latest-primary.svg" alt="" />
            </div>
            <div className="row">
                {posts.map((post) => (
                <div className="col-md-4" key={post.id}>
                    <div className="card mb-4 text-center border-0">
                        <div className="card-body p-0">
                            <div className="img-container">
                                <img src={post.image} alt="" />
                            </div>
                            <div className='px-3 py-4'>
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">{post.content}</p>
                                <Link className="alternate-text" href={`/posts/${post.id}`}>
                                    <div >Read More</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}