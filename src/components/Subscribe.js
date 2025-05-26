'use client';

import { useState, useEffect } from 'react';

export default function Subscribe({ sectionClassName = " ", 
  inputClassName = " " }) {
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasMounted, setHasMounted] = useState(false); // ← Add this line


  useEffect(() => {
    setHasMounted(true);
  }, []); // <- ADD THIS

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    setIsSubmitting(true);
    setStatus('');

    try {
      const data = new FormData(form);
      
      const response = await fetch('https://formspree.io/f/mjkworrp', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      const result = await response.json();
      
      if (result.ok) {
        setStatus('Thanks for subscribing!');
        form.reset();
      } else {
        throw new Error(result.error || 'Submission failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

    if (!hasMounted) return null; // <- AVOID HYDRATION ERROR

  return (
    <div className={`container-fluid blue-text py-5 px-4 px-lg-5 border-0 ${sectionClassName}`}>
      <h2 className='header px-30'>Subscribe to My Newsletter</h2>
      <p className='px-20'>Get updates, new posts, and more directly in your inbox.</p>
      <form onSubmit={handleSubmit} className='px-18'>
        <div className="mb-4">
          <label className="form-label">Your Name<span className='alternate-text'>*</span></label>
          <input 
            type="text" 
            name="name" 
            className={`form-control alternate-text shadow-none ${inputClassName}`}
            required 
            disabled={isSubmitting}
          />
        </div>
        <div className="mb-4">
          <label className="form-label">Your Email<span className='alternate-text'>*</span></label>
          <input 
            type="email" 
            name="email" 
            className={`form-control alternate-text shadow-none ${inputClassName}`}
            required 
            disabled={isSubmitting}
          />
        </div>
        <button 
          type="submit" 
          className="btn btn-outline-success subscribe"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Subscribe'}
        </button>
      </form>

      {status && (
        <div
          suppressHydrationWarning
          className={`mt-4 alert secondary primary-text ${
            status.includes('Thanks') ? 'alert-success' : 'alert-danger'
          }`}
        >
          {status}
        </div>
      )}
    </div>
  );
}