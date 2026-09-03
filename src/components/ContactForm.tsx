"use client";

import { FormEvent } from "react";

const WHATSAPP_NUMBER = "919873960474";

const projectLabels: Record<string, string> = {
  website: "Website",
  "web-app": "Web app",
  ecommerce: "E-commerce",
  design: "UI/UX or brand",
  other: "Something else",
};

const budgetLabels: Record<string, string> = {
  "under-5k": "Under $5k",
  "5k-10k": "$5k–$10k",
  "10k-25k": "$10k–$25k",
  "25k-plus": "$25k+",
  "not-sure": "Not sure yet",
};

export function ContactForm() {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (data.get("companyFax")) return;

    const projectType = String(data.get("projectType") || "");
    const budget = String(data.get("budget") || "");
    const message = [
      "New PurpleDevs project inquiry",
      "",
      `Name: ${String(data.get("name") || "")}`,
      `Email: ${String(data.get("email") || "")}`,
      `Project: ${projectLabels[projectType] || projectType}`,
      `Budget: ${budgetLabels[budget] || budget}`,
      "",
      "Brief:",
      String(data.get("summary") || ""),
    ].join("\n");

    window.location.assign(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`);
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-row"><label>Name<input name="name" required minLength={2} autoComplete="name" /></label><label>Email<input name="email" required type="email" autoComplete="email" /></label></div>
      <div className="form-row">
        <label>What are we making?<select name="projectType" required defaultValue=""><option value="" disabled>Choose one</option><option value="website">Website</option><option value="web-app">Web app</option><option value="ecommerce">E-commerce</option><option value="design">UI/UX or brand</option><option value="other">Something else</option></select></label>
        <label>Working budget<select name="budget" required defaultValue=""><option value="" disabled>Choose a range</option><option value="under-5k">Under $5k</option><option value="5k-10k">$5k–$10k</option><option value="10k-25k">$10k–$25k</option><option value="25k-plus">$25k+</option><option value="not-sure">Not sure yet</option></select></label>
      </div>
      <label>Tell us the useful bit<textarea name="summary" required minLength={20} maxLength={3000} rows={7} placeholder="What needs to change, what does success look like, and when do you want to launch?" /></label>
      <label className="honeypot" aria-hidden="true">Company fax<input name="companyFax" tabIndex={-1} autoComplete="off" /></label>
      <label className="consent"><input type="checkbox" name="privacyAccepted" value="true" required /> <span>I’m happy for PurpleDevs to use these details to reply to this inquiry.</span></label>
      <div className="form-submit"><button className="button button-primary" type="submit">Send via WhatsApp →</button><p className="form-status">WhatsApp will open with your project brief ready to send.</p></div>
    </form>
  );
}
