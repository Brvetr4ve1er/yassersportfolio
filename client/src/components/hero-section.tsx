import { ArrowRight, Linkedin, ExternalLink, Twitter, Palette } from "lucide-react";
import { personalInfo, socialLinks } from "@/lib/constants";
import AvatarBuyCard from "@/components/avatar-buy-card";

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
              Art Director & Designer <br />
              Customization Wizard with Tech Skills
            </h1>
            
            <p className="text-xl text-brand-secondary mb-8 leading-relaxed max-w-lg">
              Specializing in Art Direction & Design, Web Development, Task Automation, 
              Psychology Advice, Social Media Management, and Vibe Creation. 
              Driven by learning addiction and customization wizardry.
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
            <AvatarBuyCard />
          </div>
        </div>
      </div>
    </section>
  );
}
