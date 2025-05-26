"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image'; // Import the Image component

export default function ContactForm() {
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    setIsSubmitting(true);
    setStatus('');

    try {
      const data = new FormData(form);
      
      const response = await fetch('https://formspree.io/f/xanobjjv', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      const result = await response.json();
      
      if (result.ok) {
        setStatus('Thank you for your message! We will get back to you soon.');
        form.reset();
      } else {
        throw new Error(result.error || 'Submission failed');
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setStatus('Oops! Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!hasMounted) return null;

  return (
    <div className="container-fluid py-5 px-4 px-lg-5 secondary d-flex flex-column px-18" id='contact'>
      <div className="img-container align-self-center mb-4 no-logo">
        <Image 
          src="/images/contact-1.svg" 
          alt="Contact icon" 
          width={100} // Set appropriate width
          height={100} // Set appropriate height
          // You can add more optimization props if needed
        />
      </div>
      <div className='header logo px-30'>Contact Me</div>

      {/* Rest of your form remains the same */}
      <form onSubmit={handleSubmit}>
        <div className="mt-4 mt-lg-0 mb-4">
          <label className="form-label">Your Name</label>
          <input 
            type="text" 
            name="name" 
            className="form-control shadow-none primary-text" 
            required 
            disabled={isSubmitting}
          />
        </div>
        
        <div className="mb-4">
          <label className="form-label">Your Email</label>
          <input 
            type="email" 
            name="email" 
            className="form-control shadow-none primary-text" 
            required 
            disabled={isSubmitting}
          />
        </div>
        
        <div className="mb-4">
          <label className="form-label">Your Message</label>
          <textarea 
            name="message" 
            className="form-control shadow-none primary-text" 
            rows="4" 
            required
            disabled={isSubmitting}
          ></textarea>
        </div>
        
        <button 
          type="submit" 
          className="btn btn-outline-success contact"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Sending...
            </>
          ) : 'Submit'}
        </button>
      </form>

      {status && (
        <div className={`mt-5 alert border-0 alternate primary-text ${status.includes('Thank you') ? 'alert-success' : 'alert-danger'}`}>
          {status}
        </div>
      )}
    </div>
  );
}