"use client";

import { FormEvent, useState } from "react";

type Status = { kind: "idle" | "sending" | "success" | "error"; message?: string };

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ kind: "sending" });
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message || "Your message could not be sent.");
      form.reset();
      setStatus({ kind: "success", message: "Message sent. We'll take a proper look and get back to you." });
    } catch (error) {
      setStatus({ kind: "error", message: error instanceof Error ? error.message : "Your message could not be sent. Please try again." });
    }
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
      <div className="form-submit"><button className="button button-primary" type="submit" disabled={status.kind === "sending"}>{status.kind === "sending" ? "Sending…" : "Send the brief →"}</button><p className={`form-status ${status.kind}`} role="status" aria-live="polite">{status.message}</p></div>
    </form>
  );
}
