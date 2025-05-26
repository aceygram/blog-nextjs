import { useRouter } from 'next/router';
import { posts } from '../posts/posts'; // Update with your actual path
import Link from 'next/link';
import RecentBlog from '@/components/RecentBlog';
import Subscribe from '@/components/Subscribe';

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const formatContent = (content) => {
  // Split content into sentences first
  const sentences = content.split(/(?<=[.!?])\s+/);
  const paragraphs = [];
  let currentParagraph = [];
  let wordCount = 0;

  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i];
    const wordsInSentence = sentence.split(/\s+/).length;
    
    // Check if adding this sentence would exceed 200 words
    if (wordCount + wordsInSentence > 150 && currentParagraph.length > 0) {
      // Join current paragraph and capitalize first letter
      let paragraph = currentParagraph.join(' ');
      paragraph = paragraph.charAt(0).toUpperCase() + paragraph.slice(1);
      paragraphs.push(paragraph);
      
      // Start new paragraph with current sentence
      currentParagraph = [sentence];
      wordCount = wordsInSentence;
    } else {
      currentParagraph.push(sentence);
      wordCount += wordsInSentence;
    }
  }

  // Add the last paragraph
  if (currentParagraph.length > 0) {
    let paragraph = currentParagraph.join(' ');
    paragraph = paragraph.charAt(0).toUpperCase() + paragraph.slice(1);
    paragraphs.push(paragraph);
  }

  return paragraphs;
};

export default function BlogPost() {
  const router = useRouter();
  const { id } = router.query;
  
  // Find the post with matching ID
  const post = posts.find(p => p.id === Number(id));

  if (!post) {
    return (
      <div className="container py-5 text-center">
        <h1 className='header'>Post not found</h1>
        <Link href="/blog" className="btn btn-primary mt-3">
          Back to All Posts
        </Link>
      </div>
    );
  }

  const shuffledRelated = shuffleArray(posts.filter(p => p.id !== post.id)).slice(0, 3);
  const formattedContent = formatContent(post.content);

  return (
    <>
      <div className="container-fluid blog-page px-3 p-md-5">
        {/* Back button */}
        <Link href="/blog" className="btn btn-outline-secondary mb-4">
          ← Back to All Posts
        </Link>

        <div className="container-fluid p-0 py-md-1 center-content row">
            {/* Article header */}
          <article className="blog-post p-0 py-md-1 col-12 col-lg-8">
            <h1 className="mb-3 display-4 header fw-bold">{post.title}</h1>
            
            {/* Author section */}
            <div className="d-flex align-items-center mb-4">
              <img 
                src={post.author.photo} 
                alt={post.author.name}
                className="rounded-circle me-3"
                width="60"
                height="60"
                style={{ objectFit: 'cover', width: '70px' }}
              />
              <div>
                <p className="mb-0 fw-bold">{post.author.name}</p>
                <small className="text-muted">Published on {new Date().toLocaleDateString()}</small>
              </div>
            </div>

            {/* Featured image */}
            <img 
              src={post.image} 
              alt={post.title}
              className="img-fluid rounded mb-4"
              style={{ maxHeight: '500px', width: '100%', objectFit: 'cover' }}
            />

            {/* Optional paragraph (from your post structure) */}
            {post.para && (
              <div className="alert alert-info secondary primary-text mb-4">
                <p className="mb-0">{post.para}</p>
              </div>
            )}

            {/* Main content with formatted paragraphs */}
            <div className="blog-content px-20 ps-1 ">
              {formattedContent.map((paragraph, i) => (
                <p key={i} style={{ 
                  textIndent: '40px',
                  marginBottom: '1.1rem',
                  lineHeight: '1.7',
                  fontWeight: 300
                }}>
                  {paragraph}
                </p>
              ))}
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
                  <div key={relatedPost.id} className="col-md-4 mb-3">
                    <div className="card h-100">
                      <img 
                        src={relatedPost.image} 
                        className="card-img-top" 
                        alt={relatedPost.title}
                        style={{ height: '150px', objectFit: 'cover' }}
                      />
                      <div className="card-body">
                        <h5 className="card-title header">{relatedPost.title}</h5>
                        <Link 
                          href={`/posts/${relatedPost.id}`} 
                          className="alternate-text text-decoration-none fw-bold"
                          aria-label={`Read more about ${relatedPost.title}`}
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
      <Subscribe className='light-bg primary-text my-0 alternate p-5'/>
    </>
  );
}