import { ArrowRight, Linkedin, ExternalLink, Twitter, Palette } from "lucide-react";
import { personalInfo, socialLinks } from "@/lib/constants";
import avatarImage from "@assets/Untitled-1 (1)_1753181417706.jpg";

export default function HeroSection() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="pt-16 min-h-screen flex items-center justify-center bg-brand-bg relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            {personalInfo.availableForWork && (
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-brand-accent/10 text-brand-accent rounded-full text-sm font-medium">
                  Available for new opportunities
                </span>
              </div>
            )}
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-primary mb-6 leading-tight">
              Hi, I'm{" "}
              <span className="gradient-text">{personalInfo.firstName}</span>
              <br />
              English Language Instructor & <br />
              Creative Digital Artist
            </h1>
            
            <p className="text-xl text-brand-secondary mb-8 leading-relaxed max-w-lg">
              {personalInfo.bio}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection("#work")}
                className="inline-flex items-center justify-center px-8 py-4 bg-brand-accent text-black rounded-lg hover:bg-green-600 transition-all duration-200 font-medium glow-green"
              >
                View My Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <button
                onClick={() => scrollToSection("#contact")}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-brand-accent text-brand-accent rounded-lg hover:bg-brand-accent hover:text-black transition-all duration-200 font-medium"
              >
                Get In Touch
              </button>
            </div>

            <div className="mt-12 flex space-x-6">
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-secondary hover:text-brand-accent transition-colors duration-200"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href={socialLinks.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-secondary hover:text-brand-accent transition-colors duration-200"
              >
                <Palette className="h-6 w-6" />
              </a>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-secondary hover:text-brand-accent transition-colors duration-200"
              >
                <ExternalLink className="h-6 w-6" />
              </a>
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-secondary hover:text-brand-accent transition-colors duration-200"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl border-4 border-brand-accent/20">
                <img
                  src={avatarImage}
                  alt="Mohamed Yasser Hamisse - English Language Instructor & Creative Digital Artist"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-brand-accent rounded-full flex items-center justify-center shadow-lg">
                <div className="text-white text-2xl font-mono">&lt;/&gt;</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
