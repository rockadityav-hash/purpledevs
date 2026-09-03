export type Project = {
  slug: string;
  title: string;
  kind: string;
  summary: string;
  challenge: string;
  approach: string;
  outcome: string;
  image: string;
  alt: string;
  accent: "mustard" | "teal" | "rust";
};

export const projects: Project[] = [
  {
    slug: "signal-coffee",
    title: "Signal Coffee",
    kind: "Commerce / Brand system",
    summary: "A high-signal shopfront for a fictional independent roaster.",
    challenge: "Make a small-batch coffee catalogue feel energetic without turning product discovery into a scavenger hunt.",
    approach: "We paired a strict commerce grid with expressive packaging, print-registration details, and direct product language.",
    outcome: "A self-initiated concept showing how brand character and a practical buying journey can share the same page.",
    image: "/images/signal-coffee.png",
    alt: "Concept interface for Signal Coffee with textured coffee packaging in purple, mustard, rust, and teal.",
    accent: "mustard",
  },
  {
    slug: "patchwork",
    title: "Patchwork",
    kind: "Web app / Product design",
    summary: "A neighborhood calendar that makes local plans feel local.",
    challenge: "Turn a dense mix of dates, venues, and event types into something welcoming enough to explore on a whim.",
    approach: "The interface borrows from community noticeboards: modular cards, a tactile map, and clear calendar structure underneath.",
    outcome: "A fictional product concept that demonstrates information architecture, interaction hierarchy, and accessible visual density.",
    image: "/images/patchwork.png",
    alt: "Concept dashboard for Patchwork with event cards, a map, and a nostalgic desktop interface.",
    accent: "teal",
  },
  {
    slug: "rare-form",
    title: "Rare Form",
    kind: "E-commerce / Art direction",
    summary: "A digital catalogue for furniture with a second life.",
    challenge: "Give one-off objects room to feel special while keeping price, condition, and product navigation close at hand.",
    approach: "Archival inventory labels meet oversized product photography and tactile, familiar commerce controls.",
    outcome: "A self-initiated retail concept built to prove that conversion design does not need to look generic.",
    image: "/images/rare-form.png",
    alt: "Concept commerce interface for Rare Form featuring an upcycled chair, lamp, and catalogue cards.",
    accent: "rust",
  },
];

export const services = [
  { title: "Websites", copy: "New launches and sharp redesigns that explain the business, earn trust, and move people to act." },
  { title: "Web apps", copy: "Useful products, MVPs, dashboards, and customer tools designed around the job people came to do." },
  { title: "UI / UX", copy: "Research, information architecture, prototypes, and design systems that turn complexity into momentum." },
  { title: "Brand systems", copy: "A practical visual language for digital-first businesses—identity, type, color, and rules that survive real use." },
  { title: "E-commerce", copy: "Stores that balance character with clear discovery, confident product pages, and low-friction checkout paths." },
  { title: "Care + growth", copy: "Post-launch improvements, experiments, maintenance, and measurement without the mystery retainer fog." },
];
