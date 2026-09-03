import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = { title: "Start a project — PurpleDevs", description: "Tell PurpleDevs what you want to build and why it matters." };

export default function ContactPage() {
  return <main id="main"><section className="shell page-hero"><p className="eyebrow">Start a project</p><h1>Give us the<br />useful bit.</h1><p className="page-intro">What needs to change? What does a good result look like? A rough brief is fine. A polished procurement novel is not required.</p></section>
    <section className="shell contact-layout"><aside className="contact-aside"><h2>Before you hit send</h2><ul><li>Budget ranges help us recommend the right-sized approach.</li><li>Real deadlines beat “ASAP,” but flexible is a valid answer.</li><li>Your details are used only to respond to this project inquiry.</li></ul><p><strong>Typical reply:</strong><br />Within two working days.</p></aside><ContactForm /></section>
  </main>;
}
