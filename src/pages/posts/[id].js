import { useRouter } from 'next/router';

const posts = [
  {
    id: 1,
    title: 'My First Blog Post',
    content: 'We often admire people who achieve great success — entrepreneurs, athletes, artists — and wonder what their secret is. While talent, luck, and opportunity all play roles, there’s one ingredient that stands out across every success story: consistency. Consistency might not sound exciting, but it’s a superpower. It’s the quiet force behind every long-term achievement. The truth is, doing a small task every day beats doing a huge task once in a while. Whether it’s improving your health, learning a new skill, or building a business, the results come from what you do repeatedly, not occasionally. Let’s take fitness as an example. You won’t get strong by going to the gym for 6 hours once a month. But if you work out for just 30 minutes a day, five times a week, you’ll see real progress over time. The same goes for reading, saving money, writing, or even building a social media presence. The compound effect of consistent effort is real — and powerful. Why is consistency so effective? First, it builds momentum. Starting something new is hard, but once you turn it into a habit, it becomes easier. That habit becomes part of your identity. You’re not someone who’s “trying” to write — you’re a writer because you write every day. Second, consistency allows for compounding improvement. Each small step builds on the last. You might not see massive results in the beginning, but after a few weeks or months, the difference is obvious. This is often called the “1% rule” — getting just 1% better each day leads to dramatic results over time. But let’s be honest: staying consistent isn’t always easy. Life is busy, distractions are everywhere, and motivation fades. That’s why it helps to set realistic goals and make your habits easy to stick with. Want to start journaling? Commit to writing just one sentence a day. Want to learn a language? Spend five minutes on a language app daily. It’s not about perfection — it’s about showing up. Also, track your progress. A simple calendar or habit tracker can keep you motivated. Every checkmark is proof that you’re moving forward, even if it’s slow. Over time, those checkmarks add up to something meaningful. Finally, be patient. Consistency doesn’t bring instant results, and that’s okay. Focus on the process, not just the outcome. Trust that your daily actions are leading somewhere — because they are. In a world that often celebrates overnight success, it’s important to remember that most real success is slow, steady, and unglamorous. So whether you’re starting a new habit, launching a project, or simply trying to be a little better than yesterday — keep going. Your future self will thank you.',
    image: '/images/scenery.jpg',
    author: {
      name: 'Elizabeth Baekholt',
      photo: '/images/about-img-1.png',
    },

    para: 'Hello, if you are new here, you can come and get this egg for me'
  },
  {
    id: 2,
    title: 'Next.js and Bootstrap',
    content: 'Learn how to use Next.js with Bootstrap.',
    image: '/images/post2.jpg',
    author: {
      name: 'John Doe',
      photo: '/images/author2.jpg',
    },
  },
  // Add more posts as needed
];

export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  const post = posts.find((post) => post.id === parseInt(id));
  const recentPosts = posts.filter((p) => p.id !== parseInt(id));

  if (!post) {
    return <h2>Post not found</h2>;
  }

  return (
    <div className="container">
      <div className="container-xl my-5">
        <div className="row">
          <div className="col-lg-8 col-md-12">
            {/* Main blog post content */}
            <img src={post.image} alt={post.title} className="img-fluid mb-4" />
            <h1>{post.title}</h1>

            <div className="d-flex align-items-center mb-4">
              <img
                src={post.author.photo}
                alt={post.author.name}
                className="rounded-circle me-3"
                width="50"
                height="50"
              />
              <span className="fw-bold">{post.author.name}</span>
            </div>

            <p className='ps-5'>{post.para}</p>
            <p>{post.content}</p>
          </div>

          <div className="col-lg-4 col-md-12">
            {/* Sidebar: Recent Posts */}
            <h4 className="mb-4">Recent Posts</h4>
            {recentPosts.map((p) => (
              <div key={p.id} className="mb-3">
                <a href={`/post/${p.id}`} className="text-decoration-none">
                  <div className="d-flex">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="me-3"
                      style={{ width: '80px', height: '60px', objectFit: 'cover' }}
                    />
                    <div>
                      <h6 className="mb-0">{p.title}</h6>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}