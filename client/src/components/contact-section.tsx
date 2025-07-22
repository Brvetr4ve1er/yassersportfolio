import SocialTooltip from "./social-tooltip";

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-brand-primary mb-6">
            Let's Connect
          </h2>
          <p className="text-xl text-brand-secondary max-w-3xl mx-auto">
            Ready to discuss your next project, explore collaboration opportunities, or just say hello? 
            Hover over the button below to connect with me on your preferred platform.
          </p>
        </div>

        <div className="flex justify-center">
          <SocialTooltip />
        </div>
      </div>
    </section>
  );
}