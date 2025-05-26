import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";

export default function Navbar() {
    const router = useRouter();
    const currentRoute = router.pathname;
    const [isScrolled, setIsScrolled] = useState(false);
    const navbarCollapseRef = useRef(null);
    const [bootstrap, setBootstrap] = useState(null);

    // Load Bootstrap safely
    useEffect(() => {
        const loadBootstrap = async () => {
            const bootstrap = await import('bootstrap/dist/js/bootstrap.bundle.min');
            setBootstrap(bootstrap);
        };
        loadBootstrap();
    }, []);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const closeMobileMenu = () => {
        if (!bootstrap || !navbarCollapseRef.current) return;
        
        try {
            // Get existing collapse instance or create new one
            const collapseInstance = bootstrap.Collapse.getInstance(navbarCollapseRef.current) || 
                                   new bootstrap.Collapse(navbarCollapseRef.current, { toggle: false });
            collapseInstance.hide();
        } catch (error) {
            console.error('Error closing menu:', error);
            // Fallback to class manipulation
            navbarCollapseRef.current.classList.remove('show');
        }
    };

    return (
        <nav className={`navbar fixed-top navbar-expand-lg navbar-light ${isScrolled ? 'navbar-shrink' : ''}`}>
            <div className="container-fluid">
                <div className="logo">
                    <img src="/images/logo.svg" alt="Website Logo" />
                </div>
                <button 
                    className="navbar-toggler primary" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNavAltMarkup"
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div 
                    className="collapse navbar-collapse" 
                    id="navbarNavAltMarkup"
                    ref={navbarCollapseRef}
                >
                    <div className="navbar-nav row container nav-pills nav-justified">
                        <Link href="/" className={`nav-link col ${currentRoute === '/' ? 'active' : ''}`} onClick={closeMobileMenu}>
                            HOME
                        </Link>
                        <Link href="/blog" className={`nav-link col ${currentRoute === '/blog' ? 'active' : ''}`} onClick={closeMobileMenu}>
                            BLOG
                        </Link>
                        <Link href="/bio" className={`nav-link col ${currentRoute === '/bio' ? 'active' : ''}`} onClick={closeMobileMenu}>
                            ABOUT
                        </Link>
                        <Link href="/#contact" className="nav-link col" onClick={closeMobileMenu}>
                            CONTACT
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}