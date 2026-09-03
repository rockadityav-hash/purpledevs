import Link from "next/link";

const links = [["Work", "/work"], ["Services", "/services"], ["About", "/about"]] as const;

export function SiteHeader() {
  return (
    <header className="shell site-header">
      <Link className="brand" href="/" aria-label="PurpleDevs home"><span className="brand-mark" aria-hidden="true" />PurpleDevs</Link>
      <nav className="nav desktop-nav" aria-label="Primary navigation">
        {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        <Link className="nav-cta" href="/contact">Start a project</Link>
      </nav>
      <details className="mobile-menu">
        <summary>Menu</summary>
        <nav aria-label="Mobile navigation">{links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}<Link href="/contact">Start a project →</Link></nav>
      </details>
    </header>
  );
}
