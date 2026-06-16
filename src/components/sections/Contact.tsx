import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { animate, stagger } from "animejs";
import { toast } from "sonner";
import { Mail, MapPin, Send, Loader2 } from "lucide-react";
import { LinkedinIcon } from "../ui/BrandIcons";

// Form Validation Schema using Zod
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(3, { message: "Subject must be at least 3 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  // Staggered slide up animation on page load using Anime.js
  useEffect(() => {
    animate(".contact-animate", {
      opacity: [0, 1],
      translateY: [35, 0],
      delay: stagger(100),
      duration: 750,
      ease: "outQuad"
    });
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Message sent! I'll get back to you soon.");
        reset();
      } else {
        toast.error(result.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to connect to the server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full py-16 px-6 md:px-12 bg-bg-primary">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-12 select-none">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary">
            Get In Touch
          </h2>
          <div className="h-[1px] flex-grow bg-border-custom" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Side: Contact Cards */}
          <div className="lg:col-span-5 space-y-6 select-text">
            <div className="contact-animate opacity-0">
              <h3 className="text-xl font-semibold text-accent-blue-light mb-4 select-none">
                Contact Information
              </h3>
              <p className="text-text-secondary leading-relaxed mb-6">
                Have an interesting project, job opportunity, or just want to chat? 
                Feel free to send a message. I usually respond within 24 hours.
              </p>
            </div>

            {/* Info Cards */}
            <div className="space-y-4">
              {/* Email Card */}
              <div className="contact-animate opacity-0 glass-card p-5 rounded-xl flex items-center gap-4 hover:border-accent-blue/30 transition-colors duration-300">
                <span className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent-blue/10 text-accent-blue flex-shrink-0 select-none">
                  <Mail size={22} />
                </span>
                <div>
                  <h4 className="text-xs font-mono text-text-secondary uppercase tracking-widest select-none">
                    Email Me
                  </h4>
                  <a
                    href="mailto:abhidinesh0215@gmail.com"
                    className="text-text-primary font-medium hover:text-accent-blue-light transition-colors text-sm md:text-base break-all"
                  >
                    abhidinesh0215@gmail.com
                  </a>
                </div>
              </div>

              {/* LinkedIn Card */}
              <div className="contact-animate opacity-0 glass-card p-5 rounded-xl flex items-center gap-4 hover:border-accent-blue/30 transition-colors duration-300">
                <span className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent-blue/10 text-accent-blue flex-shrink-0 select-none">
                  <LinkedinIcon size={22} />
                </span>
                <div>
                  <h4 className="text-xs font-mono text-text-secondary uppercase tracking-widest select-none">
                    Connect
                  </h4>
                  <a
                    href="https://linkedin.com/in/dinesh-abbi" // Normalized link path
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-primary font-medium hover:text-accent-blue-light transition-colors text-sm md:text-base"
                  >
                    linkedin.com/in/dinesh-abbi
                  </a>
                </div>
              </div>

              {/* Location Card */}
              <div className="contact-animate opacity-0 glass-card p-5 rounded-xl flex items-center gap-4 hover:border-accent-blue/30 transition-colors duration-300">
                <span className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent-blue/10 text-accent-blue flex-shrink-0 select-none">
                  <MapPin size={22} />
                </span>
                <div>
                  <h4 className="text-xs font-mono text-text-secondary uppercase tracking-widest select-none">
                    Location
                  </h4>
                  <span className="text-text-primary font-medium text-sm md:text-base">
                    Hyderabad, Telangana, India
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-7 glass-card p-6 md:p-8 rounded-xl border border-border-custom hover:border-accent-blue/15 transition-all duration-300">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 select-text">
              {/* Name Field */}
              <div className="contact-animate opacity-0 space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-text-primary block select-none">
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className={`w-full px-4 py-3 bg-bg-secondary rounded-lg border text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:ring-1 focus:ring-accent-blue transition-colors ${
                    errors.name ? "border-red-500/70 focus:ring-red-500" : "border-border-custom focus:border-accent-blue"
                  }`}
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-xs font-medium text-red-400 mt-1 select-none">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="contact-animate opacity-0 space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-text-primary block select-none">
                  Your Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="johndoe@example.com"
                  className={`w-full px-4 py-3 bg-bg-secondary rounded-lg border text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:ring-1 focus:ring-accent-blue transition-colors ${
                    errors.email ? "border-red-500/70 focus:ring-red-500" : "border-border-custom focus:border-accent-blue"
                  }`}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs font-medium text-red-400 mt-1 select-none">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Subject Field */}
              <div className="contact-animate opacity-0 space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-text-primary block select-none">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  placeholder="Collaboration details..."
                  className={`w-full px-4 py-3 bg-bg-secondary rounded-lg border text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:ring-1 focus:ring-accent-blue transition-colors ${
                    errors.subject ? "border-red-500/70 focus:ring-red-500" : "border-border-custom focus:border-accent-blue"
                  }`}
                  {...register("subject")}
                />
                {errors.subject && (
                  <p className="text-xs font-medium text-red-400 mt-1 select-none">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div className="contact-animate opacity-0 space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-text-primary block select-none">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Hi Dinesh, let's talk about..."
                  className={`w-full px-4 py-3 bg-bg-secondary rounded-lg border text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:ring-1 focus:ring-accent-blue transition-colors resize-none ${
                    errors.message ? "border-red-500/70 focus:ring-red-500" : "border-border-custom focus:border-accent-blue"
                  }`}
                  {...register("message")}
                />
                {errors.message && (
                  <p className="text-xs font-medium text-red-400 mt-1 select-none">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="contact-animate opacity-0 w-full py-3.5 px-6 bg-accent-blue hover:bg-accent-blue-light disabled:bg-accent-blue/60 text-text-primary font-medium rounded-lg shadow-lg shadow-accent-blue/25 hover:shadow-accent-blue-light/35 flex items-center justify-center gap-2 transition-all duration-300 disabled:cursor-not-allowed select-none"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
