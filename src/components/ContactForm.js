import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const data = new FormData(form);

    const response = await fetch('https://formspree.io/f/xanobjjv', {
      method: 'POST',
      body: data,
    });

    if (response.ok) {
      setStatus('Thank you for your message!');
    } else {
      setStatus('Oops, something went wrong. Please try again.');
    }
  };

  return (
    <div className="container-fluid py-5 px-5 secondary" id='contact'>
      <h1>Contact Me</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Your Name</label>
          <input type="text" name="name" className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Your Email</label>
          <input type="email" name="email" className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Your Message</label>
          <textarea name="message" className="form-control" rows="4" required></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      {status && <p>{status}</p>}
    </div>
  );
}