import { Palette, Code, Globe, Users } from "lucide-react";
import { skills, experience } from "@/lib/constants";

const iconMap = {
  palette: Palette,
  code: Code,
  globe: Globe,
  users: Users,
};

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-brand-bg-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-primary mb-4">
            About Me
          </h2>
          <p className="text-xl text-brand-secondary max-w-3xl mx-auto">
            Multi-disciplinary specialist driven by learning addiction and passion for 
            customizing everything with advanced tech skills
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h3 className="text-2xl font-bold text-brand-primary mb-6">
              My Story
            </h3>
            <div className="prose prose-lg text-brand-secondary space-y-4">
              <p>
                My journey began with an insatiable curiosity and addiction to learning that has evolved 
                into expertise across Art Direction & Design, Web Development, and Task Automation. 
                What started as a passion for customizing everything I could get my hands on 
                transformed into professional mastery across multiple disciplines.
              </p>
              <p>
                Today, I channel my customization wizardry and tech skills into creating exceptional 
                digital experiences, providing psychology advice and spirit uplifting, while managing 
                social media presence and vibe creation. My diverse skill set allows me to approach 
                every project with both technical precision and creative vision.
              </p>
              <p>
                When I'm not designing or developing, you'll find me exploring new technologies to master, 
                customizing systems for optimal efficiency, or providing psychological support and 
                motivation to uplift others. I'm driven by my learning addiction and love for making 
                everything work better through smart customization!
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-brand-primary mb-6">
              Skills & Expertise
            </h3>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {skills.map((skill, index) => {
                const IconComponent = iconMap[skill.icon as keyof typeof iconMap];
                return (
                  <div
                    key={index}
                    className="text-center p-6 bg-slate-50 rounded-lg"
                  >
                    <IconComponent className="w-8 h-8 text-brand-accent mx-auto mb-3" />
                    <h4 className="font-semibold text-brand-primary mb-2">
                      {skill.category}
                    </h4>
                    <p className="text-sm text-brand-secondary">
                      {skill.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Experience Timeline */}
            <h4 className="text-xl font-bold text-brand-primary mb-4">
              Experience
            </h4>
            <div className="space-y-4">
              {experience.map((exp, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-brand-accent rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h5 className="font-semibold text-brand-primary">
                      {exp.title}
                    </h5>
                    <p className="text-brand-secondary text-sm mb-1">
                      {exp.company} • {exp.period}
                    </p>
                    <p className="text-brand-secondary text-sm">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
