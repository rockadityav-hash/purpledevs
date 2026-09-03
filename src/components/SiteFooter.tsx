import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer"><div className="shell footer-grid">
      <div><Link className="brand footer-brand" href="/"><span className="brand-mark" aria-hidden="true" />PurpleDevs</Link><p>Small studio. Loud ideas. Useful websites.</p></div>
      <nav aria-label="Footer navigation"><Link href="/work">Work</Link><Link href="/services">Services</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></nav>
      <div className="footer-note"><span>Available for select projects</span><p>© {new Date().getFullYear()} PurpleDevs.<br />Built with intent, not filler.</p></div>
    </div></footer>
  );
}
