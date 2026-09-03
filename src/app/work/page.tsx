import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content/site";

export const metadata: Metadata = { title: "Work — PurpleDevs", description: "Self-initiated concept studies showing how PurpleDevs approaches websites, web apps, and commerce." };

export default function WorkPage() {
  return <main id="main"><section className="shell page-hero"><p className="eyebrow">The workbench</p><h1>Ideas with<br />receipts.</h1><p className="page-intro">These are self-initiated concept studies—not disguised client claims. Each one makes our design thinking, product judgment, and technical instincts visible.</p></section>
    <section className="shell work-grid" aria-label="Concept studies">{projects.map((project) => <Link className={`project-card accent-${project.accent}`} href={`/work/${project.slug}`} key={project.slug}><div className="project-image"><Image src={project.image} alt={project.alt} width={1536} height={1024} sizes="(max-width: 800px) 100vw, 80vw" /></div><div className="project-meta"><span>{project.kind}</span><strong>{project.title}</strong><p>{project.summary}</p><b>Open case study ↗</b></div></Link>)}</section>
  </main>;
}
