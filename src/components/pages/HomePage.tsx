// HPI 1.5-V
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { Heart, Award, Clock, Users, MapPin, ArrowRight, Phone, Calendar, Star } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { ServiciosVeterinarios } from '@/entities';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// --- Utility Components for "Living" Experience ---

// 1. Intersection Observer Reveal (Mandatory Safe Pattern)
type AnimatedElementProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
};

const AnimatedReveal: React.FC<AnimatedElementProps> = ({ 
  children, 
  className = "", 
  delay = 0,
  direction = 'up'
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          element.classList.add('is-visible');
        }, delay);
        observer.unobserve(element);
      }
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

  const getTransform = () => {
    switch(direction) {
      case 'up': return 'translate-y-8';
      case 'left': return '-translate-x-8';
      case 'right': return 'translate-x-8';
      default: return '';
    }
  };

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ease-out opacity-0 ${getTransform()} ${className}`}
      style={{ willChange: 'opacity, transform' }}
    >
      <style>{`
        .is-visible {
          opacity: 1 !important;
          transform: translate(0, 0) !important;
        }
      `}</style>
      {children}
    </div>
  );
};

// 2. Parallax Image Component (Scroll-linked)
const ParallaxImage = ({ src, alt, className, speed = 0.5 }: { src: string, alt: string, className?: string, speed?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const scrollProgress = 1 - (rect.bottom / (window.innerHeight + rect.height));
      // Only animate if in view
      if (scrollProgress > -0.5 && scrollProgress < 1.5) {
        element.style.setProperty('--scroll-offset', `${scrollProgress * 100 * speed}px`);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div 
        className="w-full h-[120%] -mt-[10%] transition-transform duration-75 ease-linear will-change-transform"
        style={{ transform: 'translateY(var(--scroll-offset, 0px))' }}
      >
        <Image src={src} alt={alt} width={1200} className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

// 3. Mouse Follow Effect (Safe Local State)
const MouseGlow = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(0, 168, 232, 0.15),
              transparent 80%
            )
          `,
        }}
      />
    </div>
  );
};

export default function HomePage() {
  // --- Canonical Data Sources ---
  const [featuredServices, setFeaturedServices] = useState<ServiciosVeterinarios[]>([]);
  
  // Preserve original data fetching logic
  useEffect(() => {
    const loadServices = async () => {
      const { items } = await BaseCrudService.getAll<ServiciosVeterinarios>('serviciosveterinarios');
      setFeaturedServices(items.slice(0, 3));
    };
    loadServices();
  }, []);

  // Preserve original static data
  const features = [
    {
      icon: Heart,
      title: 'Atención Personalizada',
      description: 'Seguimiento individual para cada mascota con cuidado dedicado',
    },
    {
      icon: Award,
      title: 'Profesionales Expertos',
      description: 'Equipo veterinario altamente calificado y experimentado',
    },
    {
      icon: Clock,
      title: 'Horarios Flexibles',
      description: 'Abierto hasta las 19:00 para tu comodidad',
    },
    {
      icon: Users,
      title: 'Variedad de Productos',
      description: 'Amplio stock de productos para el cuidado de tus mascotas',
    },
  ];

  // --- Render ---
  return (
    <div className="min-h-screen bg-background font-paragraph overflow-clip selection:bg-primary/20 selection:text-primary-foreground">
      <Header />

      {/* --- HERO SECTION --- */}
      <section className="relative w-full min-h-[95vh] flex items-center justify-center overflow-hidden pt-20 lg:pt-0">
        {/* Abstract Background Shapes */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-secondary/10 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4" />
        </div>

        <div className="container max-w-[120rem] mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Content */}
            <div className="lg:col-span-5 flex flex-col gap-8 relative z-20">
              <AnimatedReveal direction="right">
                <Badge variant="outline" className="w-fit px-4 py-2 border-primary/30 text-primary bg-primary/5 rounded-full text-sm font-heading tracking-wide uppercase">
                  <Star className="w-3 h-3 mr-2 fill-primary" />
                  Veterinaria & Pet Shop
                </Badge>
              </AnimatedReveal>
              
              <AnimatedReveal delay={100} direction="right">
                <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[1.1] tracking-tight">
                  Cuidado <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Experto</span>, <br />
                  Amor <span className="text-secondary relative inline-block">
                    Genuino
                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-secondary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                    </svg>
                  </span>.
                </h1>
              </AnimatedReveal>

              <AnimatedReveal delay={200} direction="right">
                <p className="font-paragraph text-xl text-foreground/80 leading-relaxed max-w-xl">
                  En Milicotas, la atención es personalizada. Realizamos un seguimiento detallado de cada paciente, brindando el cuidado profesional y cariñoso que tu familia merece.
                </p>
              </AnimatedReveal>

              <AnimatedReveal delay={300} direction="right">
                <div className="flex flex-wrap gap-4">
                  <Link to="/servicios">
                    <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all hover:scale-105">
                      Nuestros Servicios
                    </Button>
                  </Link>
                  <Link to="/contacto">
                    <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-2 border-foreground/10 hover:bg-foreground/5 hover:border-foreground/20 transition-all">
                      Agendar Cita
                    </Button>
                  </Link>
                </div>
              </AnimatedReveal>

              {/* Trust Indicators */}
              <AnimatedReveal delay={400} direction="right">
                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-12 h-12 rounded-full border-2 border-background bg-gray-200 overflow-hidden">
                         <Image 
                           src={`https://static.wixstatic.com/media/773a78_1caecdec808b4f92a878321c6577e282~mv2.png?id=avatar-${i}`} 
                           alt="Happy client" 
                           width={48} 
                           className="w-full h-full object-cover"
                         />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex text-secondary">
                      {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={16} fill="currentColor" />)}
                    </div>
                    <span className="text-sm font-medium text-foreground/60">Clientes felices</span>
                  </div>
                </div>
              </AnimatedReveal>
            </div>

            {/* Hero Visual Composition */}
            <div className="lg:col-span-7 relative h-[600px] lg:h-[800px] w-full hidden md:block">
              {/* Main Background Image (Facade) - Parallax Layer 1 */}
              <div className="absolute top-10 right-0 w-[85%] h-[90%] rounded-[3rem] overflow-hidden shadow-2xl rotate-3 border-8 border-white z-10">
                <ParallaxImage 
                  src="https://static.wixstatic.com/media/773a78_a33421450bf24c498c72a11eb28b145d~mv2.png" 
                  alt="Milicotas Fachada" 
                  className="w-full h-full"
                  speed={0.2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              </div>

              {/* Floating Element (Dog) - Parallax Layer 2 */}
              <motion.div 
                className="absolute bottom-20 left-10 w-[45%] aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white z-20"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Image 
                  src="https://static.wixstatic.com/media/773a78_62b4685ef87542bb91fb8f701cfbe6a4~mv2.png" 
                  alt="Mascota feliz" 
                  width={500}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Floating Badge/Card - Parallax Layer 3 */}
              <motion.div 
                className="absolute top-32 left-0 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl z-30 max-w-[240px]"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-100 rounded-full text-green-600">
                    <Clock size={20} />
                  </div>
                  <span className="font-bold text-foreground text-sm">Abierto Hoy</span>
                </div>
                <p className="text-xs text-foreground/70">
                  Visítanos hasta las 19:00hs para consultas y compras.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MARQUEE SECTION --- */}
      <div className="w-full bg-primary py-6 overflow-hidden relative z-20 -mt-10 lg:-mt-20 rotate-1 shadow-lg">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center mx-8">
              <span className="text-white font-heading font-bold text-2xl uppercase tracking-widest">Veterinaria</span>
              <span className="mx-6 text-white/50">•</span>
              <span className="text-white font-heading font-bold text-2xl uppercase tracking-widest">Pet Shop</span>
              <span className="mx-6 text-white/50">•</span>
              <span className="text-white font-heading font-bold text-2xl uppercase tracking-widest">Peluquería</span>
              <span className="mx-6 text-white/50">•</span>
            </div>
          ))}
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
        `}</style>
      </div>

      {/* --- ABOUT / INTRO SECTION --- */}
      <section className="w-full py-32 bg-white relative overflow-hidden">
        <div className="container max-w-[100rem] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <AnimatedReveal direction="left" className="relative">
              <div className="relative rounded-[3rem] overflow-hidden aspect-square bg-gray-100">
                 {/* Family photo with pets and owners */}
                 <div className="absolute inset-0">
                    <Image 
                      src="https://static.wixstatic.com/media/773a78_497ae77c1f8242d496e08bfc6db790fe~mv2.png" 
                      alt="Familia Milicotas con mascotas y sus dueños" 
                      width={600}
                      className="w-full h-full object-cover"
                    />
                 </div>
                 {/* Decorative circle */}
                 <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
              </div>
            </AnimatedReveal>

            <div className="flex flex-col gap-8">
              <AnimatedReveal>
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Más que una veterinaria, somos familia.
                </h2>
              </AnimatedReveal>
              
              <AnimatedReveal delay={100}>
                <p className="font-paragraph text-lg text-foreground/70 leading-relaxed">
                  En Milicotas entendemos que tu mascota es un miembro más de la familia. Por eso, nuestro enfoque va más allá de la medicina; se trata de crear un vínculo de confianza y cariño.
                </p>
                <p className="font-paragraph text-lg text-foreground/70 leading-relaxed mt-4">
                  Desde consultas de rutina hasta asesoramiento nutricional, estamos aquí para acompañarte en cada etapa de la vida de tu compañero.
                </p>
              </AnimatedReveal>

              <AnimatedReveal delay={200}>
                <div className="grid grid-cols-2 gap-6 mt-4">
                  <div className="flex flex-col gap-2 p-4 bg-background rounded-xl border border-border/50">
                    <span className="text-3xl font-bold text-primary">10+</span>
                    <span className="text-sm text-foreground/60 font-medium">Años de Experiencia</span>
                  </div>
                  <div className="flex flex-col gap-2 p-4 bg-background rounded-xl border border-border/50">
                    <span className="text-3xl font-bold text-secondary">100%</span>
                    <span className="text-sm text-foreground/60 font-medium">Compromiso</span>
                  </div>
                </div>
              </AnimatedReveal>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES GRID (Sticky Layout) --- */}
      <section className="w-full py-32 bg-background relative">
        <div className="container max-w-[100rem] mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Sticky Header */}
            <div className="lg:w-1/3">
              <div className="sticky top-32">
                <AnimatedReveal>
                  <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">¿Por qué elegirnos?</span>
                  <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
                    Excelencia en cada detalle.
                  </h2>
                  <p className="font-paragraph text-lg text-foreground/70 mb-8">
                    Nos esforzamos por brindar un servicio integral que cubra todas las necesidades de tu mascota en un solo lugar.
                  </p>
                  <Link to="/contacto">
                    <Button className="rounded-full px-8">Contáctanos</Button>
                  </Link>
                </AnimatedReveal>
              </div>
            </div>

            {/* Grid Cards */}
            <div className="lg:w-2/3 grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <AnimatedReveal key={index} delay={index * 100} className="h-full">
                  <div className="group relative h-full bg-white p-8 rounded-3xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 overflow-hidden">
                    <MouseGlow />
                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                        <feature.icon size={28} />
                      </div>
                      <h3 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="font-paragraph text-foreground/60 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </AnimatedReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES SHOWCASE (Dynamic) --- */}
      {featuredServices.length > 0 && (
        <section className="w-full py-32 bg-white overflow-hidden">
          <div className="container max-w-[120rem] mx-auto px-6">
            <div className="flex justify-between items-end mb-16">
              <AnimatedReveal>
                <h2 className="font-heading text-4xl md:text-6xl font-bold text-foreground">
                  Nuestros <br/> Servicios
                </h2>
              </AnimatedReveal>
              <AnimatedReveal delay={100}>
                <Link to="/servicios" className="hidden md:flex items-center gap-2 text-lg font-bold text-primary hover:gap-4 transition-all">
                  Ver todos <ArrowRight size={20} />
                </Link>
              </AnimatedReveal>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {featuredServices.map((service, index) => (
                <AnimatedReveal key={service._id} delay={index * 150}>
                  <Link to="/servicios" className="group block h-full">
                    <div className="relative h-[500px] rounded-[2rem] overflow-hidden bg-gray-100 isolate">
                      {/* Image Background */}
                      {service.serviceImage ? (
                        <Image
                          src={service.serviceImage}
                          alt={service.serviceName || 'Servicio'}
                          width={600}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
                           <Image 
                             src="https://static.wixstatic.com/media/773a78_1caecdec808b4f92a878321c6577e282~mv2.png?id=placeholder-service" 
                             alt="Placeholder" 
                             width={400} 
                             className="opacity-20 w-1/2"
                           />
                        </div>
                      )}
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 w-full p-8 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="font-heading text-3xl font-bold mb-3">{service.serviceName}</h3>
                        <p className="font-paragraph text-white/80 line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          {service.description}
                        </p>
                        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
                          <span className="w-8 h-[2px] bg-secondary" />
                          Ver Detalles
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimatedReveal>
              ))}
            </div>
            
            <div className="mt-12 text-center md:hidden">
               <Link to="/servicios">
                  <Button variant="outline" className="w-full">Ver todos los servicios</Button>
               </Link>
            </div>
          </div>
        </section>
      )}

      {/* --- LOCATION & MAP TEASER --- */}
      <section className="w-full py-24 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        
        <div className="container max-w-[100rem] mx-auto px-6">
          <div className="bg-primary rounded-[3rem] overflow-hidden shadow-2xl relative">
            <div className="grid lg:grid-cols-2">
              
              {/* Text Content */}
              <div className="p-12 lg:p-20 flex flex-col justify-center relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white w-fit mb-8 backdrop-blur-sm">
                  <MapPin size={16} />
                  <span className="text-sm font-bold">Ubicación Central</span>
                </div>
                
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
                  Visítanos en <br/> Buenos Aires
                </h2>
                
                <div className="space-y-6 text-white/90 mb-10">
                  <div className="flex items-start gap-4">
                    <MapPin className="mt-1 shrink-0 text-secondary" />
                    <p className="text-lg">Palpa 2465, C1426 Cdad. Autónoma de Buenos Aires</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="mt-1 shrink-0 text-secondary" />
                    <p className="text-lg">Lunes a Sábado: 9:00 - 19:00</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="mt-1 shrink-0 text-secondary" />
                    <p className="text-lg">011 4783-4584</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <a 
                    href="https://maps.app.goo.gl/aZtn6iVjtEnVBoQ29" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-14 px-8 rounded-full bg-white text-primary font-bold text-lg hover:bg-secondary hover:text-foreground transition-colors shadow-lg"
                  >
                    Abrir en Google Maps
                  </a>
                  <Link to="/ubicacion">
                    <Button variant="outline" className="h-14 px-8 rounded-full border-white/30 text-white hover:bg-white/10 hover:text-white text-lg">
                      Ver Mapa en Sitio
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Image/Map Visual */}
              <div className="relative h-[400px] lg:h-auto min-h-full bg-gray-200">
                 <Image 
                   src="https://static.wixstatic.com/media/773a78_c0175e8a96ff4938975786ccf27fa72d~mv2.png" 
                   alt="Fachada Milicotas" 
                   width={800}
                   className="absolute inset-0 w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="w-full py-32 bg-white text-center">
        <div className="container max-w-4xl mx-auto px-6">
          <AnimatedReveal direction="up">
            <h2 className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-8">
              ¿Listo para visitarnos?
            </h2>
            <p className="font-paragraph text-xl text-foreground/60 mb-12 max-w-2xl mx-auto">
              Tu mascota merece la mejor atención. Agenda una cita hoy mismo o acércate a nuestra sucursal.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/contacto">
                <Button size="lg" className="h-16 px-10 text-xl rounded-full bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20">
                  Contactar Ahora
                </Button>
              </Link>
              <div className="flex items-center gap-3 text-foreground/60">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <Phone size={20} />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold uppercase tracking-wider">Llámanos</p>
                  <p className="font-bold text-foreground">011 4783-4584</p>
                </div>
              </div>
            </div>
          </AnimatedReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}