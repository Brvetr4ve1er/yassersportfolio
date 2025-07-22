import EnhancedContactCard from "./enhanced-contact-card";

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 px-4 relative bg-brand-bg">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl lg:text-5xl font-black text-brand-primary mb-6 tracking-tight">
            Let's Connect
          </h2>
          <p className="text-xl text-brand-secondary max-w-3xl mx-auto leading-relaxed">
            Ready to discuss your next project, explore collaboration opportunities, or just say hello? 
            Click on the cassette tape below and choose your preferred platform to connect.
          </p>
        </div>

        <div className="flex justify-center">
          <EnhancedContactCard />
        </div>
      </div>
    </section>
  );
}