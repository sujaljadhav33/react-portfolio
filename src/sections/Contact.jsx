import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  
} from "lucide-react";
import { Instagram } from 'lucide-react';
import { Button } from "@/components/Button";
import { useState } from "react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "sujaljadhav2703@gmail.com",
    href: "mailto:sujaljadhav2703@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91-9653610369",
    href: "tel:+919653610369",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Mumbai Thane, 400604",
    href: "#",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "____sujal__2704",
    href: "https://www.instagram.com/____sujal__2704?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  }

];

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    type: null,
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "19901f4c-2076-430e-a8ba-e6edcda540ac",
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: "Message sent successfully!",
        });
        setFormData({ name: "", email: "", message: "" });
      } else throw new Error();
    } catch {
      setSubmitStatus({
        type: "error",
        message: "Failed to send message.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-32">
      <div className="mx-auto max-w-5xl px-3 sm:px-6">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <span className="text-xs sm:text-sm uppercase tracking-wider text-secondary-foreground">
            Get In Touch
          </span>

          <h2 className="mt-3 mb-4 text-2xl sm:text-4xl md:text-5xl font-bold text-secondary-foreground wrap-break-word">
            Let's build{" "}
            <span className="font-serif italic font-normal text-white">
              something great.
            </span>
          </h2>

          <p className="text-xs sm:text-base text-muted-foreground">
            Have a project in mind? I’d love to hear about it.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Form */}
          <div className="glass rounded-2xl border border-primary/30 p-4 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">

              <input
                type="text"
                required
                placeholder="Your name..."
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm sm:px-4 sm:py-3 outline-none"
              />

              <input
                type="email"
                required
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm sm:px-4 sm:py-3 outline-none"
              />

              <textarea
                rows={4}
                required
                placeholder="Your message..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full resize-none rounded-xl border border-border bg-surface px-3 py-2.5 text-sm sm:px-4 sm:py-3 outline-none"
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                {isLoading ? "Sending..." : "Send Message"}
                {!isLoading && <Send className="w-4 h-4 sm:w-5 sm:h-5" />}
              </Button>

              {submitStatus.type && (
                <div
                  className={`flex gap-2 rounded-xl p-3 text-xs sm:text-sm ${
                    submitStatus.type === "success"
                      ? "bg-green-500/10 text-green-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {submitStatus.type === "success" ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <AlertCircle className="w-4 h-4" />
                  )}
                  {submitStatus.message}
                </div>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 sm:space-y-6">
            <div className="glass rounded-2xl p-4 sm:p-8">
              <h3 className="mb-4 text-base sm:text-xl font-semibold">
                Contact Information
              </h3>

              {contactInfo.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="flex items-center gap-3 rounded-xl p-3 hover:bg-surface"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="truncate text-sm font-medium">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
