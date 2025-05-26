import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/styles.css';
import { IBM_Plex_Sans, Playfair_Display_SC } from 'next/font/google';

// Configure your fonts
const ibmPlexSans = IBM_Plex_Sans({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
});

const playfairDisplay = Playfair_Display_SC({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
  style: ['normal', 'italic'],
});

export const metadata = {
  title: {
    default: `Tone Elizabeth's Blog`,
    template: `%s | Tone Elizabeth's Blog`
  },
  description: 'Thoughtful articles and insights on Politics, Geopolitics, Politics around the world',
  metadataBase: new URL('https://yourdomain.com'), // Replace with your actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: `Tone Elizabeth's Blog`,
    description: 'Thoughtful articles and insights on Politics, Geopolitics, Politics around the world',
    url: 'https://yourdomain.com',
    siteName: `Tone Elizabeth's Blog`,
    images: [
      {
        url: '../../images/hero-img.jpg', // Replace with your default OG image
        width: 1200,
        height: 630,
        alt: `Tone Elizabeth's Blog`,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Tone Elizabeth's Blog`,
    description: 'Thoughtful articles and insights on Politics, Geopolitics, Politics around the world',
    images: ['/default-twitter-image.jpg'], // Replace with your Twitter image
    creator: '@yourtwitterhandle', // Replace with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  // ❌ REMOVED: themeColor from metadata
};

// NEW: Add viewport configuration
export function generateViewport() {
  return {
    themeColor: '#ffffff', // Your brand color
    width: 'device-width',
    initialScale: 1,
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${ibmPlexSans.variable} ${playfairDisplay.variable}`}>
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Mobile Optimization */}
        {/* ❌ REMOVED: viewport meta (now handled by generateViewport) */}
        {/* ❌ REMOVED: theme-color meta (now handled by generateViewport) */}
      </head>
      <body className="bg-light">
        {children}
      </body>
    </html>
  );
}