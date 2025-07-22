import { GraduationCap, Award, Calendar, MapPin } from "lucide-react";

export default function EducationSection() {
  const education = [
    {
      degree: "Computer Science (Software Engineering)",
      institution: "Mohamed El Bachir El Ibrahimi University",
      period: "Jan 2018 – Jun 2025 (expected)",
      location: "Algeria",
      description: "Focus: problem solving, communication in technical environments",
      icon: GraduationCap,
    },
    {
      degree: "Baccalaureate – Electrical Engineering & IT",
      institution: "Said Zerrouki High School",
      period: "Graduated: 2018",
      location: "Bordj Bou Arreridj",
      description: "Foundation in electrical engineering and information technology",
      icon: GraduationCap,
    },
  ];

  const certifications = [
    {
      title: "Duolingo English Test",
      issuer: "Duolingo",
      score: "130/160 overall score",
      description: "High proficiency in English communication",
      icon: Award,
    },
    {
      title: "Digital Drawing Course",
      issuer: "Artiland.Studio",
      description: "Professional digital art and illustration techniques",
      icon: Award,
    },
    {
      title: "Motion Design Course",
      issuer: "Currently Learning",
      description: "Advanced motion graphics and video design",
      icon: Award,
    },
    {
      title: "2nd Place – Regional Cross Country Running",
      issuer: "Regional Sports Authority",
      description: "Demonstrates endurance, commitment, and competitive spirit",
      icon: Award,
    },
  ];

  return (
    <section id="education" className="py-20 bg-brand-bg-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-primary mb-4">
            Education & Certifications
          </h2>
          <p className="text-xl text-brand-secondary max-w-3xl mx-auto">
            Academic background and professional development journey
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <h3 className="text-2xl font-bold text-brand-primary mb-8 flex items-center">
              <GraduationCap className="mr-3 h-6 w-6 text-brand-accent" />
              Education
            </h3>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="bg-brand-surface p-6 rounded-lg shadow-sm border border-brand-secondary/20 hover:bg-brand-surface-hover transition-colors">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-brand-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <edu.icon className="w-6 h-6 text-brand-accent" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-brand-primary mb-2">
                        {edu.degree}
                      </h4>
                      <p className="text-brand-accent font-medium mb-1">
                        {edu.institution}
                      </p>
                      <div className="flex items-center text-brand-secondary text-sm mb-2">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span className="mr-4">{edu.period}</span>
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{edu.location}</span>
                      </div>
                      <p className="text-brand-secondary text-sm">
                        {edu.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-2xl font-bold text-brand-primary mb-8 flex items-center">
              <Award className="mr-3 h-6 w-6 text-brand-accent" />
              Certifications & Achievements
            </h3>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div key={index} className="bg-brand-surface p-5 rounded-lg shadow-sm border border-brand-secondary/20 hover:bg-brand-surface-hover transition-colors">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <cert.icon className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-brand-primary mb-1">
                        {cert.title}
                      </h4>
                      <p className="text-brand-accent text-sm font-medium mb-1">
                        {cert.issuer}
                      </p>
                      {cert.score && (
                        <p className="text-green-600 text-sm font-medium mb-1">
                          {cert.score}
                        </p>
                      )}
                      <p className="text-brand-secondary text-sm">
                        {cert.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notable Achievements */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-brand-primary mb-8 text-center">
            Notable Achievements
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-brand-surface p-6 rounded-lg shadow-sm border border-brand-secondary/20 text-center hover:bg-brand-surface-hover transition-colors">
              <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h4 className="font-semibold text-brand-primary mb-2">
                Creative Business Success
              </h4>
              <p className="text-brand-secondary text-sm">
                Sold multiple infographics and branding kits to international and Algerian clients
              </p>
            </div>

            <div className="bg-brand-surface p-6 rounded-lg shadow-sm border border-brand-secondary/20 text-center hover:bg-brand-surface-hover transition-colors">
              <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h4 className="font-semibold text-brand-primary mb-2">
                English Immersion Challenge
              </h4>
              <p className="text-brand-secondary text-sm">
                Completed a full year speaking only English while living in Algeria
              </p>
            </div>

            <div className="bg-brand-surface p-6 rounded-lg shadow-sm border border-brand-secondary/20 text-center hover:bg-brand-surface-hover transition-colors">
              <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">₿</span>
              </div>
              <h4 className="font-semibold text-brand-primary mb-2">
                Crypto Trading Success
              </h4>
              <p className="text-brand-secondary text-sm">
                Turned $800 investment into 11 ETH (~$34,000) through NFT art and trading
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}