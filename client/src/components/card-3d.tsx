import { useRef, useEffect, ReactNode } from 'react';

interface Card3DProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export default function Card3D({ children, className = '', intensity = 1 }: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      const rotateX = (mouseY / (rect.height / 2)) * -10 * intensity;
      const rotateY = (mouseX / (rect.width / 2)) * 10 * intensity;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    };

    const handleMouseEnter = () => {
      card.style.transform = 'perspective(1000px) translateZ(10px)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [intensity]);

  return (
    <div
      ref={cardRef}
      className={`card-3d transition-transform duration-100 ease-out ${className}`}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="card-3d-inner">
        {children}
      </div>
    </div>
  );
}