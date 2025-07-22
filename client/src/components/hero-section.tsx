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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center justify-items-center">
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {personalInfo.availableForWork && (
              <div className="inline-block mb-6">
                <span className="px-6 py-3 bg-brand-accent/10 text-brand-accent rounded-full text-sm font-medium border border-brand-accent/20">
                  Available for new opportunities
                </span>
              </div>
            )}
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-primary mb-8 leading-tight max-w-4xl">
              Hi, I'm{" "}
              <span className="gradient-text">{personalInfo.firstName}</span>
              <br />
              <span className="text-brand-accent">Art Director & Designer</span> <br />
              <span className="text-brand-secondary">Customization Wizard with Tech Skills</span>
            </h1>
            
            <p className="text-xl text-brand-secondary mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Specializing in Art Direction & Design, Web Development, Task Automation, 
              Psychology Advice, Social Media Management, and Vibe Creation. 
              Driven by learning addiction and customization wizardry.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <button
                onClick={() => scrollToSection("#work")}
                className="inline-flex items-center justify-center px-10 py-4 bg-brand-accent text-black rounded-lg hover:bg-brand-accent/80 transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-brand-accent/20"
              >
                View My Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button
                onClick={() => scrollToSection("#contact")}
                className="inline-flex items-center justify-center px-10 py-4 border-2 border-brand-accent text-brand-accent rounded-lg hover:bg-brand-accent hover:text-black transition-all duration-300 font-medium text-lg"
              >
                Get In Touch
              </button>
            </div>

            <div className="mt-16 flex justify-center lg:justify-start space-x-8">
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-secondary hover:text-brand-accent transition-all duration-300 p-3 rounded-full hover:bg-brand-accent/10"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-7 w-7" />
              </a>
              <a
                href={socialLinks.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-secondary hover:text-brand-accent transition-all duration-300 p-3 rounded-full hover:bg-brand-accent/10"
                aria-label="Behance Portfolio"
              >
                <Palette className="h-7 w-7" />
              </a>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-secondary hover:text-brand-accent transition-all duration-300 p-3 rounded-full hover:bg-brand-accent/10"
                aria-label="Instagram"
              >
                <ExternalLink className="h-7 w-7" />
              </a>
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-secondary hover:text-brand-accent transition-all duration-300 p-3 rounded-full hover:bg-brand-accent/10"
                aria-label="Twitter"
              >
                <Twitter className="h-7 w-7" />
              </a>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <AvatarBuyCard />
          </div>
        </div>
      </div>
    </section>
  );
}
