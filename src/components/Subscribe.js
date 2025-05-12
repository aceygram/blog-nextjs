import { useState } from 'react';

export default function Subscribe() {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const data = new FormData(form);

    const response = await fetch('https://formspree.io/f/mjkworrp', {
      method: 'POST',
      body: data,
    });

    if (response.ok) {
      setStatus('Thanks for subscribing! 🎉');
      form.reset();
    } else {
      setStatus('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="container blue-text border-0  my-5">
      <h2 style={{color: ''}}>Subscribe to My Newsletter</h2>
      <p>Get updates, new posts, and more directly in your inbox.</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="form-label">Your Name<span className='alternate-text'>*</span></label>
          <input type="text" name="name" className="form-control alternate-text shadow-none" required />
        </div>
        <div className="mb-4">
          <label className="form-label">Your Email<span className='alternate-text'>*</span></label>
          <input type="email" name="email" className="form-control alternate-text shadow-none" required />
        </div>
        <button type="submit" className="btn btn-outline-success subscribe">Subscribe</button>
      </form>

      {status && <div className="mt-3 alert alert-info">{status}</div>}
    </div>
  );
}