import { Code, Palette, Languages, BookOpen, Users, Lightbulb } from "lucide-react";

const skillCategories = [
  {
    title: "Languages & Communication",
    icon: <Languages className="w-8 h-8" />,
    color: "#3b82f6",
    skills: [
      { name: "Arabic", level: "Native", proficiency: 100 },
      { name: "English", level: "Fluent", proficiency: 95 },
      { name: "French", level: "Conversational", proficiency: 75 },
      { name: "Cross-cultural Communication", level: "Expert", proficiency: 90 }
    ]
  },
  {
    title: "Digital Art & Design",
    icon: <Palette className="w-8 h-8" />,
    color: "#8b5cf6",
    skills: [
      { name: "Adobe Creative Suite", level: "Advanced", proficiency: 90 },
      { name: "Digital Illustration", level: "Expert", proficiency: 95 },
      { name: "NFT Creation", level: "Intermediate", proficiency: 80 },
      { name: "Social Media Design", level: "Expert", proficiency: 95 }
    ]
  },
  {
    title: "Education & Training",
    icon: <BookOpen className="w-8 h-8" />,
    color: "#22c55e",
    skills: [
      { name: "English Language Teaching", level: "Expert", proficiency: 95 },
      { name: "Curriculum Development", level: "Advanced", proficiency: 85 },
      { name: "Student Assessment", level: "Advanced", proficiency: 88 },
      { name: "Educational Technology", level: "Intermediate", proficiency: 75 }
    ]
  },
  {
    title: "Technical Skills",
    icon: <Code className="w-8 h-8" />,
    color: "#f59e0b",
    skills: [
      { name: "Web Design Basics", level: "Intermediate", proficiency: 70 },
      { name: "Content Management", level: "Advanced", proficiency: 85 },
      { name: "Social Media Strategy", level: "Expert", proficiency: 90 },
      { name: "Project Coordination", level: "Advanced", proficiency: 85 }
    ]
  },
  {
    title: "Soft Skills",
    icon: <Users className="w-8 h-8" />,
    color: "#ef4444",
    skills: [
      { name: "Leadership", level: "Advanced", proficiency: 88 },
      { name: "Creative Problem Solving", level: "Expert", proficiency: 92 },
      { name: "Adaptability", level: "Expert", proficiency: 95 },
      { name: "Cultural Sensitivity", level: "Expert", proficiency: 95 }
    ]
  },
  {
    title: "Innovation & Growth",
    icon: <Lightbulb className="w-8 h-8" />,
    color: "#06b6d4",
    skills: [
      { name: "Trend Analysis", level: "Advanced", proficiency: 85 },
      { name: "Creative Direction", level: "Advanced", proficiency: 88 },
      { name: "Brand Development", level: "Intermediate", proficiency: 80 },
      { name: "Continuous Learning", level: "Expert", proficiency: 98 }
    ]
  }
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Skills & Expertise
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A diverse skill set spanning education, creative arts, and cross-cultural communication, 
            developed through years of teaching, artistic creation, and international collaboration.
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
              Continuously expanding my expertise through formal education, self-directed learning, 
              and hands-on project experience. Always eager to tackle new challenges and master emerging technologies.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <span>🎓 Formal Education</span>
              <span>📚 Self-Directed Learning</span>
              <span>🚀 Project-Based Growth</span>
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