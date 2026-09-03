import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/content/site";

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return project ? { title: `${project.title} — PurpleDevs concept study`, description: project.summary } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return <main id="main"><article>
    <header className="shell case-hero"><span className="case-label">Self-initiated concept / {project.kind}</span><h1 className="case-title">{project.title}</h1><div className="case-media"><Image src={project.image} alt={project.alt} width={1536} height={1024} priority /></div></header>
    <div className="shell case-copy"><section><span>The challenge</span><h2>Make it clear.</h2><p>{project.challenge}</p></section><section><span>The move</span><h2>Give it a point.</h2><p>{project.approach}</p></section><section><span>The outcome</span><h2>Show the thinking.</h2><p>{project.outcome}</p></section></div>
    <section className="contact-cta"><div className="shell cta-grid"><div><p className="eyebrow">Next on the bench</p><h2>{next.title}</h2></div><div><p>Keep browsing, or bring us a real problem to solve.</p><Link className="button button-secondary" href={`/work/${next.slug}`}>Next study →</Link> <Link className="button button-primary" href="/contact">Start a project →</Link></div></div></section>
  </article></main>;
}
