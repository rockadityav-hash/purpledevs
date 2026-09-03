import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy — PurpleDevs", description: "How PurpleDevs handles project inquiry information." };

export default function PrivacyPage() {
  return <main id="main"><section className="shell page-hero"><p className="eyebrow">Privacy, in plain words</p><h1>Your details<br />stay useful.</h1><p className="page-intro">We use information submitted through the project form only to assess and respond to your inquiry. We do not sell it or use the free-text content for advertising.</p></section><section className="shell page-section content-grid"><h2>The short version</h2><div><p>Inquiry messages are delivered to the PurpleDevs project mailbox through our email provider. Access is limited to the people handling new projects. If you want your inquiry removed, reply to the conversation and ask.</p><p>Hosting and basic operational services may process technical request information needed to keep the site secure and available. This page will be updated when production analytics or additional providers are enabled.</p></div></section></main>;
}
