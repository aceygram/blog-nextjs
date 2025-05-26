// app/(main)/layout.js
'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from "../../components/Navbar";
import Footer from '../../components/Footer';

export default function MainLayout({ children }) {
  const pathname = usePathname();

  // Bootstrap initialization (moved from _app.js)
  useEffect(() => {
    let carousels = [];
    
    const initializeCarousels = async () => {
      const bootstrap = await import('bootstrap/dist/js/bootstrap.bundle.min');
      
      // Cleanup existing
      carousels.forEach(c => c?.dispose());
      
      // Initialize new
      carousels = Array.from(document.querySelectorAll('.carousel')).map(el => 
        new bootstrap.Carousel(el, { interval: 3000, ride: 'carousel', wrap: true })
      );
    };

    initializeCarousels();
    window.scrollTo(0, 0); // Scroll to top

    return () => carousels.forEach(c => c?.dispose());
  }, [pathname]);

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}