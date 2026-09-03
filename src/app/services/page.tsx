import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/content/site";

export const metadata: Metadata = { title: "Services — PurpleDevs", description: "Websites, web apps, UI/UX, brand systems, e-commerce, and ongoing optimization." };

export default function ServicesPage() {
  return <main id="main"><section className="shell page-hero"><p className="eyebrow">What we do</p><h1>One studio.<br />Useful range.</h1><p className="page-intro">Bring us the fuzzy business problem. We’ll shape the strategy, visual direction, experience, and build into one coherent thing.</p></section>
    <section className="services-section"><div className="shell"><div className="service-list">{services.map((service, index) => <article key={service.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{service.title}</h3><p>{service.copy}</p></article>)}</div></div></section>
    <section className="shell section content-grid"><h2>A good fit looks like…</h2><div><ul><li>You have a real business goal, not just a request to “make it pop.”</li><li>You want a partner who will challenge the brief when the work needs it.</li><li>You can give focused feedback and involve decision-makers early.</li><li>You care about accessible, maintainable work after the launch confetti.</li></ul><Link className="button button-primary" href="/contact">Tell us what you’re making →</Link></div></section>
  </main>;
}
