import avatarImage from "@assets/Untitled-1 (1)_1753181417706.jpg";
import { Star, Palette, Users, Globe, Award } from "lucide-react";

export default function AvatarBuyCard() {
  return (
    <div className="avatar-buy-card">
      <div className="card-pattern-grid"></div>
      <div className="card-overlay-dots"></div>
      
      <div className="card-title-area">
        <span>Mohamed Yasser</span>
        <div className="card-tag">VIP</div>
      </div>

      <div className="card-body">
        <div className="avatar-container">
          <img 
            src={avatarImage} 
            alt="Mohamed Yasser Hamisse"
            className="avatar-image"
          />
        </div>
        
        <p className="card-description">
          Trilingual creative professional specializing in English instruction, 
          digital art, and cross-cultural communication from Algiers, Algeria.
        </p>

        <div className="feature-grid">
          <div className="feature-item">
            <div className="feature-icon">
              <Globe />
            </div>
            <span className="feature-text">3 Languages</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon">
              <Palette />
            </div>
            <span className="feature-text">Digital Artist</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon">
              <Users />
            </div>
            <span className="feature-text">200+ Students</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon">
              <Award />
            </div>
            <span className="feature-text">Certified</span>
          </div>
        </div>

        <div className="card-actions">
          <div className="price">
            <span className="price-currency">★</span>
            5.0
            <span className="price-period">Rating</span>
          </div>
          <button 
            className="card-button"
            onClick={() => {
              const contactSection = document.querySelector('#contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Hire Me
          </button>
        </div>
      </div>

      <div className="accent-shape"></div>
      <div className="corner-slice"></div>
      
      <div className="stamp">
        <span className="stamp-text">Pro</span>
      </div>
    </div>
  );
}