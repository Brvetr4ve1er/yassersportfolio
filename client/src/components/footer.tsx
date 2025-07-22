import { personalInfo } from "@/lib/constants";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-brand-bg py-12 border-t border-brand-secondary/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-brand-secondary text-sm">
              © 2024 {personalInfo.name}. Built with passion and love for computers 💻
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <a
              href="#"
              className="text-brand-secondary hover:text-brand-accent transition-colors duration-200 text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-brand-secondary hover:text-brand-accent transition-colors duration-200 text-sm"
            >
              Terms of Service
            </a>
            <button
              onClick={scrollToTop}
              className="text-brand-secondary hover:text-brand-accent transition-colors duration-200 text-sm"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
