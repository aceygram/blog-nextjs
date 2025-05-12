import Link from "next/link"
import { useRouter } from "next/router"

export default function Navbar() {
    const router = useRouter();
    const currentRoute = router.pathname;

    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav row container nav-pills nav-justified">
                        <Link href="/" className={`nav-link col ${currentRoute === '/index' || currentRoute === '/' ? 'active' : ''}`}>HOME</Link>
                        <Link href="#" className={`nav-link col ${currentRoute === '/blog' ? 'active' : ''}`}>BLOG</Link>
                        <Link href="/bio" className={`nav-link col ${currentRoute === '/bio' ? 'active' : ''}`}>ABOUT</Link>
                        <Link href="/#contact" className={`nav-link col ${currentRoute === '/contact' ? 'active' : ''}`}>CONTACT</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}