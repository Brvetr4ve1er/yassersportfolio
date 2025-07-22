import { useEffect } from "react";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import WorkSection from "@/components/work-section";
import SkillsSection from "@/components/skills-section";
import EducationSection from "@/components/education-section";
import TestimonialsSection from "@/components/testimonials-section";
import HobbiesSection from "@/components/hobbies-section";
import BlogSection from "@/components/blog-section";
import ContactSection from "@/components/contact-section";
import ResumeDownload from "@/components/resume-download";
import Footer from "@/components/footer";
import FluidBackground from "@/components/fluid-background";
import CustomCursor from "@/components/custom-cursor";
import { personalInfo } from "@/lib/constants";

export default function Home() {
  useEffect(() => {
    // Set page title and meta description for SEO
    document.title = `${personalInfo.name} - ${personalInfo.title}`;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        `${personalInfo.name} - ${personalInfo.bio} Portfolio showcasing design and development work.`
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = `${personalInfo.name} - ${personalInfo.bio} Portfolio showcasing design and development work.`;
      document.head.appendChild(meta);
    }

    // Add Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:title");
      meta.content = `${personalInfo.name} - ${personalInfo.title}`;
      document.head.appendChild(meta);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:description");
      meta.content = personalInfo.bio;
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="min-h-screen bg-brand-bg relative">
      <CustomCursor />
      <FluidBackground />
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <WorkSection />
        <SkillsSection />
        <EducationSection />
        <TestimonialsSection />
        <HobbiesSection />
        <BlogSection />
        <ContactSection />
        <div className="max-w-4xl mx-auto px-4 pb-20">
          <ResumeDownload />
        </div>
      </main>
      <Footer />
    </div>
  );
}
