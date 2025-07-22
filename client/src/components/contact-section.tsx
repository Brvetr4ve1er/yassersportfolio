import { MessageCircle, Send, Facebook, ExternalLink, ChevronDown, ChevronUp, Palette, Briefcase, Users, Globe } from "lucide-react";
import { useState } from "react";

interface ContactCard {
  platform: string;
  icon: React.ReactNode;
  link: string;
  username: string;
  description: string;
  color: string;
}

interface ContactCategory {
  title: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  platforms: ContactCard[];
}

const contactCategories: ContactCategory[] = [
  {
    title: "Messaging",
    icon: <MessageCircle className="w-6 h-6" />,
    description: "Direct communication channels",
    color: "#22c55e",
    platforms: [
      {
        platform: "WhatsApp",
        icon: <MessageCircle className="w-8 h-8" />,
        link: "https://wa.me/213123456789",
        username: "+213 123 456 789",
        description: "Quick messages and voice calls",
        color: "#25D366"
      },
      {
        platform: "Telegram",
        icon: <Send className="w-8 h-8" />,
        link: "https://t.me/nobodysamsa",
        username: "@nobodysamsa",
        description: "Secure messaging and file sharing",
        color: "#0088cc"
      }
    ]
  },
  {
    title: "Social Media",
    icon: <Users className="w-6 h-6" />,
    description: "Connect on social platforms",
    color: "#3b82f6",
    platforms: [
      {
        platform: "Facebook",
        icon: <Facebook className="w-8 h-8" />,
        link: "https://www.facebook.com/virgil.chu.71/",
        username: "Virgil Chu",
        description: "Connect on Facebook",
        color: "#0084ff"
      },
      {
        platform: "Instagram",
        icon: <Globe className="w-8 h-8" />,
        link: "https://instagram.com/veemoo",
        username: "@veemoo",
        description: "Visual stories and updates",
        color: "#E4405F"
      }
    ]
  },
  {
    title: "Professional",
    icon: <Briefcase className="w-6 h-6" />,
    description: "Business and career networks",
    color: "#8b5cf6",
    platforms: [
      {
        platform: "LinkedIn",
        icon: <ExternalLink className="w-8 h-8" />,
        link: "https://linkedin.com/in/mohamedyasser",
        username: "Mohamed Yasser",
        description: "Professional networking",
        color: "#0077B5"
      },
      {
        platform: "Behance",
        icon: <Palette className="w-8 h-8" />,
        link: "https://behance.net/mohamedyasser",
        username: "Mohamed Yasser",
        description: "Creative portfolio showcase",
        color: "#1769ff"
      }
    ]
  },
  {
    title: "All Links",
    icon: <Globe className="w-6 h-6" />,
    description: "Centralized link hub",
    color: "#f59e0b",
    platforms: [
      {
        platform: "Linktree",
        icon: <ExternalLink className="w-8 h-8" />,
        link: "https://linktr.ee/VEEMOo?fbclid=IwY2xjawLsUXdleHRuA2FlbQIxMABicmlkETFKcFdCU3lQZm5acUZYUU1WAR4SaB1huxi455-QfI-nEAWwuUgm10SEg_NH6YLMwEX9zixxER0dvrd8MdUygw_aem_FVDPF-OSA-zViFHJun12RA",
        username: "VEEMOo",
        description: "All my social links in one place",
        color: "#39e75f"
      }
    ]
  }
];

export default function ContactSection() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryTitle: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryTitle)
        ? prev.filter(title => title !== categoryTitle)
        : [...prev, categoryTitle]
    );
  };

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

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {contactCategories.map((category, categoryIndex) => (
            <CategoryDrawer
              key={category.title}
              category={category}
              isExpanded={expandedCategories.includes(category.title)}
              onToggle={() => toggleCategory(category.title)}
              index={categoryIndex}
            />
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

function CategoryDrawer({ 
  category, 
  isExpanded, 
  onToggle, 
  index 
}: { 
  category: ContactCategory; 
  isExpanded: boolean; 
  onToggle: () => void; 
  index: number; 
}) {
  return (
    <div 
      className="category-drawer"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div 
        className="category-header"
        onClick={onToggle}
        style={{ borderColor: category.color }}
      >
        <div className="category-info">
          <div className="category-icon" style={{ color: category.color }}>
            {category.icon}
          </div>
          <div>
            <h3 className="category-title">{category.title}</h3>
            <p className="category-description">{category.description}</p>
          </div>
        </div>
        <div className="category-toggle" style={{ color: category.color }}>
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </div>
      
      <div className={`category-content ${isExpanded ? 'expanded' : ''}`}>
        <div className="platforms-grid">
          {category.platforms.map((platform, platformIndex) => (
            <ContactCard 
              key={platform.platform} 
              contact={platform} 
              index={platformIndex}
              isCompact={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactCard({ 
  contact, 
  index, 
  isCompact = false 
}: { 
  contact: ContactCard; 
  index: number; 
  isCompact?: boolean; 
}) {
  const handleClick = () => {
    window.open(contact.link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`contact-card-parent ${isCompact ? 'compact' : ''}`}>
      <div 
        className="contact-card group cursor-pointer"
        onClick={handleClick}
        style={{
          animationDelay: `${index * 100}ms`,
          borderColor: contact.color,
        }}
      >
        <div className="contact-content-box">
          <div className="contact-icon" style={{ color: contact.color }}>
            {contact.icon}
          </div>
          <span className="contact-title">{contact.platform}</span>
          <p className="contact-username">{contact.username}</p>
          {!isCompact && <p className="contact-description">{contact.description}</p>}
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