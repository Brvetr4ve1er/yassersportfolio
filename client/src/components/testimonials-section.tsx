import { Quote, Star, User } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "Creative Agency",
    avatar: "SJ",
    rating: 5,
    content: "Mohamed's creative vision transformed our social media presence completely. His ability to understand our brand and translate it into compelling visual content is exceptional. The engagement on our campaigns increased by 300%.",
    project: "Social Media Campaign Design"
  },
  {
    id: 2,
    name: "Ahmed Ben Ali",
    role: "Business Owner",
    company: "Local Restaurant Chain",
    avatar: "AB",
    rating: 5,
    content: "Working with Mohamed was a game-changer for our English training program. His innovative teaching methods and cultural sensitivity helped our international staff improve their communication skills dramatically.",
    project: "Corporate English Training"
  },
  {
    id: 3,
    name: "Lisa Chen",
    role: "Art Collector",
    company: "NFT Platform",
    avatar: "LC",
    rating: 5,
    content: "Mohamed's digital art pieces are not just visually stunning, but they tell powerful stories. His understanding of both traditional art principles and modern digital techniques creates truly unique works.",
    project: "NFT Art Collection"
  },
  {
    id: 4,
    name: "Dr. Karim Mansouri",
    role: "Academic Coordinator",
    company: "University of Algiers",
    avatar: "KM",
    rating: 5,
    content: "Mohamed's coordination skills and bilingual expertise were invaluable during our international exchange program. His ability to bridge cultural gaps while maintaining academic excellence is remarkable.",
    project: "International Program Coordination"
  },
  {
    id: 5,
    name: "Emma Rodriguez",
    role: "Creative Director",
    company: "Digital Studio",
    avatar: "ER",
    rating: 5,
    content: "The creative campaigns Mohamed developed for our clients consistently exceeded expectations. His multicultural perspective brings fresh ideas that resonate with diverse audiences.",
    project: "Multi-platform Design Campaign"
  },
  {
    id: 6,
    name: "Omar Benali",
    role: "Student",
    company: "English Language Institute",
    avatar: "OB",
    rating: 5,
    content: "Mohamed made learning English enjoyable and effective. His patient teaching style and creative methods helped me achieve fluency faster than I ever imagined possible.",
    project: "English Language Instruction"
  }
];

export default function TestimonialsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Client Testimonials
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real feedback from satisfied clients, students, and collaborators who have experienced 
            the quality and dedication I bring to every project.
          </p>
        </div>

        <div className="relative">
          {/* Main Testimonial Display */}
          <div className="testimonial-carousel">
            <div 
              className="testimonial-container"
              style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  isActive={index === activeTestimonial}
                />
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="testimonial-nav-btn testimonial-nav-prev"
            aria-label="Previous testimonial"
          >
            ←
          </button>
          <button
            onClick={nextTestimonial}
            className="testimonial-nav-btn testimonial-nav-next"
            aria-label="Next testimonial"
          >
            →
          </button>

          {/* Dots Indicator */}
          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`testimonial-dot ${index === activeTestimonial ? 'active' : ''}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">50+</div>
            <div className="text-gray-300">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">200+</div>
            <div className="text-gray-300">Students Taught</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">98%</div>
            <div className="text-gray-300">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ 
  testimonial, 
  isActive 
}: { 
  testimonial: typeof testimonials[0]; 
  isActive: boolean; 
}) {
  return (
    <div className={`testimonial-card ${isActive ? 'active' : ''}`}>
      <div className="glass-card p-8 max-w-4xl mx-auto">
        <div className="testimonial-quote-icon">
          <Quote className="w-8 h-8 text-blue-400" />
        </div>
        
        <blockquote className="text-xl text-gray-300 mb-8 leading-relaxed">
          "{testimonial.content}"
        </blockquote>
        
        <div className="testimonial-author">
          <div className="testimonial-avatar">
            <div className="avatar-circle">
              {testimonial.avatar}
            </div>
          </div>
          <div className="testimonial-info">
            <div className="author-name">{testimonial.name}</div>
            <div className="author-role">{testimonial.role}</div>
            <div className="author-company">{testimonial.company}</div>
            <div className="project-type">Project: {testimonial.project}</div>
            <div className="rating">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}