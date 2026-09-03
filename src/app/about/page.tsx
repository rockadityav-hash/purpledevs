import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "About — PurpleDevs", description: "A small, opinionated web design and development studio." };

const beliefs = [
  ["Clarity is a creative tool", "The cleverest visual means nothing if people cannot tell what the business does or where to go next."],
  ["Taste needs a reason", "We chase memorable work, but every flourish has to earn its place through hierarchy, feedback, or feeling."],
  ["The build is part of the design", "Performance, accessibility, content, and implementation are not cleanup tasks after the comps are done."],
  ["Small can move properly", "A compact team keeps the people doing the work close to the people making the decisions."],
] as const;

export default function AboutPage() {
  return <main id="main"><section className="shell page-hero"><p className="eyebrow">The studio</p><h1>Small by<br />design.</h1><p className="page-intro">PurpleDevs is a compact studio built around direct collaboration, honest opinions, and websites that feel alive without becoming a usability incident.</p></section>
    <section className="shell page-section content-grid"><h2>What we believe</h2><div className="beliefs">{beliefs.map(([title, copy]) => <article className="belief" key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
    <section className="about-band"><div className="shell about-grid"><div className="about-sticker">NO B-TEAM<br />HAND-OFF</div><div><p className="eyebrow">How we work</p><h2>Talk to the people making the thing.</h2><p>Founders, designers, and developers stay in the room. That means fewer translation layers, faster calls, and work that holds onto the original idea.</p><Link className="button button-secondary" href="/contact">Work with PurpleDevs →</Link></div></div></section>
  </main>;
}
