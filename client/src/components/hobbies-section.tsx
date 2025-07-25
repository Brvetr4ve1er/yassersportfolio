import { Heart, Gamepad2, Music, Globe, Crown, Palette } from "lucide-react";
import { hobbies } from "@/lib/constants";

export default function HobbiesSection() {
  const hobbyIcons = [
    { icon: Gamepad2, color: "text-purple-600", bg: "bg-purple-100" },
    { icon: Palette, color: "text-pink-600", bg: "bg-pink-100" },
    { icon: Heart, color: "text-red-600", bg: "bg-red-100" },
    { icon: Globe, color: "text-blue-600", bg: "bg-blue-100" },
    { icon: Crown, color: "text-green-600", bg: "bg-green-100" },
    { icon: Music, color: "text-yellow-600", bg: "bg-yellow-100" },
  ];

  return (
    <section id="hobbies" className="py-20 bg-brand-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black text-brand-primary mb-6 tracking-tight">
            Interests & Hobbies
          </h2>
          <p className="text-xl text-brand-secondary max-w-3xl mx-auto leading-relaxed">
            Beyond work, I explore diverse interests that fuel my creativity and perspective
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hobbies.map((hobby, index) => {
            const iconData = hobbyIcons[index % hobbyIcons.length];
            const IconComponent = iconData.icon;

            return (
              <div key={index} className="bg-brand-surface p-6 rounded-xl hover:bg-brand-surface-hover transition-all duration-300 border border-brand-secondary/20">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 ${iconData.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <IconComponent className={`w-6 h-6 ${iconData.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-black text-brand-primary mb-2 tracking-tight">
                      {hobby.title}
                    </h3>
                    <p className="text-brand-secondary leading-relaxed">
                      {hobby.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Personal Quote */}
        <div className="mt-16 text-center">
          <div className="max-w-4xl mx-auto bg-brand-accent/10 p-8 rounded-2xl border border-brand-accent/20">
            <blockquote className="text-xl text-brand-primary italic leading-relaxed">
              "I believe language can change a person's way of thinking and allow them to reframe their 
              character through multiple cultural lenses, opening them up for a universe of opportunity 
              beyond their isolated town."
            </blockquote>
            <cite className="text-brand-accent mt-4 block font-medium">
              — Mohamed Yasser Hamisse
            </cite>
          </div>
        </div>
      </div>
    </section>
  );
}