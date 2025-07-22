import { MessageCircle, Send, Facebook } from "lucide-react";

interface ContactCard {
  platform: string;
  icon: React.ReactNode;
  link: string;
  username: string;
  description: string;
  color: string;
}

const contactMethods: ContactCard[] = [
  {
    platform: "WhatsApp",
    icon: <MessageCircle className="w-8 h-8" />,
    link: "https://wa.me/213123456789", // Replace with actual WhatsApp number
    username: "+213 123 456 789",
    description: "Quick messages and voice calls",
    color: "#25D366"
  },
  {
    platform: "Telegram",
    icon: <Send className="w-8 h-8" />,
    link: "https://t.me/mohamedyasser", // Replace with actual Telegram username
    username: "@mohamedyasser",
    description: "Secure messaging and file sharing",
    color: "#0088cc"
  },
  {
    platform: "Messenger",
    icon: <Facebook className="w-8 h-8" />,
    link: "https://m.me/mohamedyasser.hamisse", // Replace with actual Facebook username
    username: "Mohamed Yasser",
    description: "Facebook Messenger chat",
    color: "#0084ff"
  }
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Let's Connect
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to discuss your next project, explore collaboration opportunities, or just say hello? 
            Choose your preferred platform to get in touch.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {contactMethods.map((contact, index) => (
            <ContactCard key={contact.platform} contact={contact} index={index} />
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Professional Inquiries
            </h3>
            <p className="text-gray-300 mb-6">
              For business opportunities, educational consultations, or creative collaborations, 
              feel free to reach out through any of the platforms above.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <span>📍 Algiers, Algeria</span>
              <span>🌍 Available for remote work</span>
              <span>🕐 UTC+1 timezone</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCard({ contact, index }: { contact: ContactCard; index: number }) {
  const handleClick = () => {
    window.open(contact.link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="contact-card-parent">
      <div 
        className="contact-card group cursor-pointer"
        onClick={handleClick}
        style={{
          animationDelay: `${index * 200}ms`,
          borderColor: contact.color,
        }}
      >
        <div className="contact-content-box">
          <div className="contact-icon" style={{ color: contact.color }}>
            {contact.icon}
          </div>
          <span className="contact-title">{contact.platform}</span>
          <p className="contact-username">{contact.username}</p>
          <p className="contact-description">{contact.description}</p>
          <span className="contact-action" style={{ color: contact.color }}>Connect Now</span>
        </div>
        <div className="contact-badge" style={{ borderColor: contact.color }}>
          <span className="contact-status">ONLINE</span>
          <span className="contact-dot" style={{ backgroundColor: contact.color }}>●</span>
        </div>
      </div>
    </div>
  );
}