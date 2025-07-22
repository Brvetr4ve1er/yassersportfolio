import { personalInfo } from "@/lib/constants";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-900 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-slate-400 text-sm">
              © 2023 {personalInfo.name}. Built with passion and lots of coffee ☕
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <a
              href="#"
              className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
            >
              Terms of Service
            </a>
            <button
              onClick={scrollToTop}
              className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
