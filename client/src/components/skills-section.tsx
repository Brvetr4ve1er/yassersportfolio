import { Code, Palette, Languages, BookOpen, Users, Lightbulb } from "lucide-react";

const skillCategories = [
  {
    title: "Art Direction & Design",
    icon: <Palette className="w-8 h-8" />,
    color: "#8b5cf6",
    skills: [
      { name: "Visual Brand Identity", level: "Expert", proficiency: 95 },
      { name: "Creative Direction", level: "Expert", proficiency: 92 },
      { name: "Adobe Creative Suite", level: "Advanced", proficiency: 90 },
      { name: "UI/UX Design Principles", level: "Advanced", proficiency: 88 }
    ]
  },
  {
    title: "Web Development",
    icon: <Code className="w-8 h-8" />,
    color: "#f59e0b",
    skills: [
      { name: "Frontend Development", level: "Advanced", proficiency: 85 },
      { name: "Responsive Design", level: "Expert", proficiency: 90 },
      { name: "JavaScript/React", level: "Intermediate", proficiency: 78 },
      { name: "CSS/HTML Mastery", level: "Advanced", proficiency: 88 }
    ]
  },
  {
    title: "Task Automation",
    icon: <Lightbulb className="w-8 h-8" />,
    color: "#22c55e",
    skills: [
      { name: "Workflow Optimization", level: "Expert", proficiency: 95 },
      { name: "Process Automation", level: "Advanced", proficiency: 87 },
      { name: "System Integration", level: "Advanced", proficiency: 82 },
      { name: "Efficiency Solutions", level: "Expert", proficiency: 93 }
    ]
  },
  {
    title: "Psychology & Spirit Uplifting",
    icon: <Users className="w-8 h-8" />,
    color: "#ef4444",
    skills: [
      { name: "Psychological Counseling", level: "Advanced", proficiency: 88 },
      { name: "Motivational Coaching", level: "Expert", proficiency: 92 },
      { name: "Emotional Intelligence", level: "Expert", proficiency: 95 },
      { name: "Personal Development", level: "Expert", proficiency: 90 }
    ]
  },
  {
    title: "Social Media & Vibe Creation",
    icon: <Languages className="w-8 h-8" />,
    color: "#3b82f6",
    skills: [
      { name: "Social Media Strategy", level: "Expert", proficiency: 95 },
      { name: "Community Building", level: "Advanced", proficiency: 88 },
      { name: "Content Creation", level: "Expert", proficiency: 92 },
      { name: "Brand Personality", level: "Expert", proficiency: 90 }
    ]
  },
  {
    title: "Customization Wizardry",
    icon: <BookOpen className="w-8 h-8" />,
    color: "#06b6d4",
    skills: [
      { name: "System Customization", level: "Expert", proficiency: 98 },
      { name: "Learning Addiction", level: "Expert", proficiency: 100 },
      { name: "Tech Skills Mastery", level: "Advanced", proficiency: 90 },
      { name: "Innovation Mindset", level: "Expert", proficiency: 95 }
    ]
  }
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black text-brand-primary mb-6 tracking-tight">
            Skills & Expertise
          </h2>
          <p className="text-xl text-brand-secondary max-w-3xl mx-auto leading-relaxed">
            Multi-disciplinary expertise spanning Art Direction, Web Development, Task Automation, 
            Psychology Advice, and Social Media Management. Driven by an addiction to learning and 
            passion for customizing everything with advanced tech skills.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <SkillCategory
              key={category.title}
              category={category}
              index={categoryIndex}
            />
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Professional Growth
            </h3>
            <p className="text-gray-300 mb-6">
              My learning addiction drives me to constantly explore new technologies, customize every system I encounter, 
              and master emerging tools. I'm a customization wizard who combines technical skills with creative vision 
              to deliver exceptional results.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <span>🧙‍♂️ Customization Wizard</span>
              <span>🎯 Learning Addiction</span>
              <span>⚡ Tech Skills Mastery</span>
              <span>🎨 Creative + Technical</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillCategory({ 
  category, 
  index 
}: { 
  category: typeof skillCategories[0]; 
  index: number; 
}) {
  return (
    <div 
      className="skill-category"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div 
        className="skill-category-header"
        style={{ borderColor: category.color }}
      >
        <div className="skill-category-icon" style={{ color: category.color }}>
          {category.icon}
        </div>
        <h3 className="skill-category-title">{category.title}</h3>
      </div>
      
      <div className="skill-list">
        {category.skills.map((skill, skillIndex) => (
          <SkillItem
            key={skill.name}
            skill={skill}
            color={category.color}
            index={skillIndex}
          />
        ))}
      </div>
    </div>
  );
}

function SkillItem({ 
  skill, 
  color, 
  index 
}: { 
  skill: { name: string; level: string; proficiency: number }; 
  color: string; 
  index: number; 
}) {
  return (
    <div 
      className="skill-item"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="skill-header">
        <span className="skill-name">{skill.name}</span>
        <span className="skill-level" style={{ color }}>{skill.level}</span>
      </div>
      <div className="skill-progress-bar">
        <div 
          className="skill-progress-fill"
          style={{ 
            width: `${skill.proficiency}%`,
            backgroundColor: color 
          }}
        />
      </div>
    </div>
  );
}