import { useEffect, useRef } from 'react';

interface FluidBackgroundProps {
  className?: string;
}

export default function FluidBackground({ className = '' }: FluidBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const clicksRef = useRef<Array<{ x: number; y: number; time: number }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Fluid simulation parameters
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      life: number;
      maxLife: number;
    }> = [];

    const colors = [
      'rgba(34, 197, 94, 0.3)', // green
      'rgba(59, 130, 246, 0.3)', // blue
      'rgba(139, 92, 246, 0.3)', // purple
      'rgba(236, 72, 153, 0.3)', // pink
    ];

    // Create initial particles
    for (let i = 0; i < 15; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 100 + 50,
        life: Math.random() * 1000 + 500,
        maxLife: Math.random() * 1000 + 500,
      });
    }

    // Mouse movement handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    // Click handler
    const handleClick = (e: MouseEvent) => {
      clicksRef.current.push({
        x: e.clientX,
        y: e.clientY,
        time: Date.now(),
      });
      
      // Add explosion particles on click
      for (let i = 0; i < 5; i++) {
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
          size: Math.random() * 60 + 30,
          life: 300,
          maxLife: 300,
        });
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(15, 15, 35, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const now = Date.now();
      
      // Remove old clicks
      clicksRef.current = clicksRef.current.filter(click => now - click.time < 2000);

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        
        // Mouse attraction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200 && distance > 0) {
          const force = (200 - distance) / 200;
          particle.vx += (dx / distance) * force * 0.01;
          particle.vy += (dy / distance) * force * 0.01;
        }

        // Click ripples
        clicksRef.current.forEach(click => {
          const clickDx = click.x - particle.x;
          const clickDy = click.y - particle.y;
          const clickDistance = Math.sqrt(clickDx * clickDx + clickDy * clickDy);
          const clickAge = now - click.time;
          
          if (clickDistance < 300 && clickAge < 1000 && clickDistance > 0) {
            const rippleForce = (1 - clickAge / 1000) * 0.02;
            particle.vx += (clickDx / clickDistance) * rippleForce;
            particle.vy += (clickDy / clickDistance) * rippleForce;
          }
        });

        // Update position with bounds checking
        particle.x += isFinite(particle.vx) ? particle.vx : 0;
        particle.y += isFinite(particle.vy) ? particle.vy : 0;
        
        // Damping
        particle.vx = isFinite(particle.vx) ? particle.vx * 0.99 : 0;
        particle.vy = isFinite(particle.vy) ? particle.vy * 0.99 : 0;
        
        // Boundaries
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -0.8;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -0.8;
        
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        
        // Update life
        particle.life--;
        
        // Remove dead particles
        if (particle.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        
        // Draw particle
        const alpha = Math.max(0, Math.min(1, particle.life / particle.maxLife));
        const colorIndex = Math.floor((particle.x + particle.y) / 200) % colors.length;
        
        // Ensure values are finite and valid
        if (isFinite(particle.x) && isFinite(particle.y) && isFinite(particle.size) && particle.size > 0) {
          ctx.beginPath();
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, Math.max(1, particle.size)
          );
          gradient.addColorStop(0, colors[colorIndex].replace('0.3', (alpha * 0.4).toString()));
          gradient.addColorStop(1, colors[colorIndex].replace('0.3', '0'));
          
          ctx.fillStyle = gradient;
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Add new particles occasionally
      if (Math.random() < 0.02 && particles.length < 25) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 80 + 40,
          life: Math.random() * 800 + 400,
          maxLife: Math.random() * 800 + 400,
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 -z-10 ${className}`}
      style={{ 
        background: 'linear-gradient(135deg, hsl(240, 10%, 3.9%) 0%, hsl(240, 6%, 6%) 100%)',
        pointerEvents: 'auto'
      }}
    />
  );
}