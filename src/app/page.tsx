import Image from "next/image";
import Link from "next/link";
import { projects, services } from "@/content/site";

export default function Home() {
  return (
    <main id="main">
      <section className="shell hero" aria-labelledby="hero-title">
        <div className="hero-grid">
          <div>
            <p className="eyebrow">Web design + development / small studio energy</p>
            <h1 id="hero-title">Websites<br />with a <span>pulse.</span></h1>
            <p className="hero-copy">PurpleDevs builds sharp websites and useful web apps for businesses that have outgrown boring. Strategy, design, code—one opinionated little team.</p>
            <div className="hero-actions"><Link className="button button-primary" href="/contact">Start a project →</Link><Link className="button button-secondary" href="/work">See the work</Link></div>
          </div>
          <div className="receipt-window" aria-label="PurpleDevs studio receipt">
            <div className="window-bar"><span>PURPLE_OS / NEW_PROJECT.EXE</span><span className="window-dots" aria-hidden="true"><i /><i /><i /></span></div>
            <div className="receipt"><div className="receipt-top"><strong>STUDIO RECEIPT</strong><span>№ 2003</span></div><ul className="receipt-list"><li><span>Clear strategy</span><b>01</b></li><li><span>Design with a point</span><b>01</b></li><li><span>Code that holds up</span><b>01</b></li><li><span>Corporate fog</span><b>00</b></li></ul><div className="receipt-total"><span>Total</span><span>Worth it</span></div></div>
            <div className="receipt-stamp" aria-hidden="true">Made<br />for the<br />internet</div>
          </div>
        </div>
      </section>

      <div className="ticker" aria-label="PurpleDevs capabilities"><div>WEBSITES ✦ WEB APPS ✦ UI/UX ✦ E-COMMERCE ✦ BRAND SYSTEMS ✦ GOOD WEIRD IDEAS ✦</div></div>

      <section className="shell section" id="work" aria-labelledby="work-title">
        <div className="section-head"><div><p className="eyebrow">Selected experiments</p><h2 id="work-title">Proof of taste,<br />minus the theatre.</h2></div><p>Self-initiated concept studies. No imaginary conversion lifts, no borrowed logos—just a clear look at how we think.</p></div>
        <div className="project-collage">
          {projects.map((project, index) => (
            <Link className={`project-card project-${index + 1} accent-${project.accent}`} href={`/work/${project.slug}`} key={project.slug}>
              <div className="project-image"><Image src={project.image} alt={project.alt} width={1536} height={1024} sizes="(max-width: 800px) 100vw, 60vw" /></div>
              <div className="project-meta"><span>{project.kind}</span><strong>{project.title}</strong><p>{project.summary}</p><b>Open case study ↗</b></div>
            </Link>
          ))}
        </div>
        <div className="section-action"><Link className="text-link" href="/work">View the whole workbench →</Link></div>
      </section>

      <section className="services-section" id="services" aria-labelledby="services-title"><div className="shell">
        <div className="section-head inverse"><div><p className="eyebrow">What we make</p><h2 id="services-title">Serious work.<br />No serious face.</h2></div><p>From first sharpie sketch to the live thing—strategy, design, and development stay in the same conversation.</p></div>
        <div className="service-list">{services.map((service, index) => <article key={service.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{service.title}</h3><p>{service.copy}</p></article>)}</div>
        <Link className="button button-light" href="/services">See services in detail →</Link>
      </div></section>

      <section className="shell section process" aria-labelledby="process-title">
        <div className="section-head"><div><p className="eyebrow">The actual process</p><h2 id="process-title">Six moves.<br />Zero smoke bombs.</h2></div><p>You always know what is happening, what we need from you, and which decision comes next.</p></div>
        <ol className="process-strip"><li><b>Discover</b><span>Goals before pixels.</span></li><li><b>Direct</b><span>One idea worth backing.</span></li><li><b>Design</b><span>Systems, not screens.</span></li><li><b>Build</b><span>Fast, sturdy, accessible.</span></li><li><b>Launch</b><span>Check every last cable.</span></li><li><b>Improve</b><span>Learn from real use.</span></li></ol>
      </section>

      <section className="about-band" id="about" aria-labelledby="about-title"><div className="shell about-grid"><div className="about-sticker">SMALL TEAM<br />BIG TAB ENERGY</div><div><p className="eyebrow">About PurpleDevs</p><h2 id="about-title">Close enough to care.<br />Skilled enough to ship.</h2><p>We are a compact design-and-build studio for businesses that want clarity without sanding off every interesting edge. Fewer hand-offs, faster decisions, better work.</p><Link className="text-link" href="/about">Meet the studio →</Link></div></div></section>

      <section className="quote-section"><div className="shell"><blockquote>“Useful first. Unforgettable second. Usually both.”</blockquote><p>— The PurpleDevs operating system</p></div></section>

      <section className="contact-cta" id="contact"><div className="shell cta-grid"><div><p className="eyebrow">Open a new tab</p><h2>Got a project<br />with a pulse?</h2></div><div><p>Tell us what needs to change. We’ll tell you where we can help—plainly, without a 46-slide capabilities deck.</p><Link className="button button-primary" href="/contact">Start the conversation →</Link></div></div></section>
    </main>
  );
}
