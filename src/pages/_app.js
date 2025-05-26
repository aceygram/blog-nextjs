import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/styles.css';
import Head from 'next/head';
import Navbar from "@/components/Navbar";
import Footer from '@/components/Footer';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Initialize Bootstrap JS and carousels
  useEffect(() => {
    let carousels = [];
    
    const initializeCarousels = async () => {
      const bootstrap = await import('bootstrap/dist/js/bootstrap.bundle.min');
      
      // Destroy existing carousels first to prevent memory leaks
      carousels.forEach(carousel => {
        if (carousel._carousel) {
          carousel._carousel.dispose();
        }
      });
      
      // Initialize new carousels
      carousels = Array.from(document.querySelectorAll('.carousel')).map(el => {
        return new bootstrap.Carousel(el, {
          interval: 3000,
          ride: 'carousel',
          wrap: true
        });
      });
    };

    // Initialize on mount and route changes
    initializeCarousels();
    router.events.on('routeChangeComplete', initializeCarousels);

    return () => {
      // Cleanup carousels and event listener
      carousels.forEach(carousel => {
        if (carousel && carousel.dispose) {
          carousel.dispose();
        }
      });
      router.events.off('routeChangeComplete', initializeCarousels);
    };
  }, [router.events]);

  // Scroll to top on route change
  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&family=Playfair+Display+SC:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap" rel="stylesheet" />
      </Head>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}