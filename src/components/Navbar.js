'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function Navbar() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const navbarCollapseRef = useRef(null);
    const [collapseInstance, setCollapseInstance] = useState(null);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Load Bootstrap only on client side
        const initBootstrap = async () => {
            const bootstrap = await import('bootstrap/dist/js/bootstrap.bundle.min');
            if (navbarCollapseRef.current) {
                const instance = new bootstrap.Collapse(navbarCollapseRef.current, {
                    toggle: false
                });
                setCollapseInstance(instance);
            }
        };

        initBootstrap();

        return () => {
            // Clean up collapse instance
            if (collapseInstance) {
                collapseInstance.dispose();
            }
        };
    }, []);

    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            setTimeout(() => {
                const el = document.querySelector(hash);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                }
            }, 300); // delay to ensure DOM is rendered
        }
    }, [pathname]); // re-run when path changes

    const closeMobileMenu = () => {
        if (collapseInstance) {
            collapseInstance.hide();
        } else if (navbarCollapseRef.current) {
            // Fallback to class manipulation
            navbarCollapseRef.current.classList.remove('show');
        }
    };

    return (
        <nav className={`navbar fixed-top navbar-expand-lg navbar-light ${isScrolled ? 'navbar-shrink' : ''}`}>
            <div className="container-fluid">
                <div className="logo">
                    <Image 
                        src="/images/logo.svg" 
                        alt="Website Logo" 
                        width={120}
                        height={40}
                        priority
                    />
                </div>
                <button 
                    className="navbar-toggler primary" 
                    type="button" 
                    onClick={() => {
                        if (collapseInstance) {
                            collapseInstance.toggle();
                        } else if (navbarCollapseRef.current) {
                            // Fallback
                            navbarCollapseRef.current.classList.toggle('show');
                        }
                    }}
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
                        <Link href="/" className={`nav-link col ${pathname === '/' ? 'active' : ''}`} onClick={closeMobileMenu}>
                            HOME
                        </Link>
                        <Link href="/blog" className={`nav-link col ${pathname === '/blog' ? 'active' : ''}`} onClick={closeMobileMenu}>
                            BLOG
                        </Link>
                        <Link href="/bio" className={`nav-link col ${pathname === '/bio' ? 'active' : ''}`} onClick={closeMobileMenu}>
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