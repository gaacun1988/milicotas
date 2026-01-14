import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { Clock, DollarSign, CheckCircle, MessageCircle, AlertCircle } from 'lucide-react';

interface ServiciosVeterinarios {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  serviceName?: string;
  description?: string;
  serviceImage?: string;
  price?: number;
  benefits?: string;
  duration?: string;
}

export default function ServiciosPage() {
  const [services, setServices] = useState<ServiciosVeterinarios[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      const { items } = await BaseCrudService.getAll<ServiciosVeterinarios>('serviciosveterinarios');
      setServices(items);
      setLoading(false);
    };
    loadServices();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-primary to-logo-accent2 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image 
            src="https://static.wixstatic.com/media/773a78_b0321542a4614a16b55ec0add6671e99~mv2.png" 
            alt="Background" 
            width={1600}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-[100rem] mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-primary-foreground mb-6">
              Nuestros Servicios
            </h1>
            <p className="font-paragraph text-xl text-primary-foreground max-w-3xl mx-auto">
              Ofrecemos una amplia gama de servicios veterinarios profesionales para el cuidado integral de tus mascotas
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="w-full py-20">
        <div className="max-w-[100rem] mx-auto px-6">
          {services.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-paragraph text-xl text-foreground">
                Próximamente agregaremos nuestros servicios
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const isPeluqueria = service.serviceName?.toLowerCase().includes('peluquería') || 
                                     service.serviceName?.toLowerCase().includes('peluqueria');
                
                return (
                  <motion.div
                    key={service._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                  >
                    {service.serviceImage && (
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={service.serviceImage}
                          alt={service.serviceName || 'Servicio veterinario'}
                          width={500}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    )}
                    
                    <div className="p-6">
                      <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
                        {service.serviceName}
                      </h3>

                      {isPeluqueria && (
                        <div className="mb-6 p-4 bg-secondary/10 border-l-4 border-secondary rounded-r-lg">
                          <div className="flex items-start gap-3">
                            <AlertCircle className="text-secondary flex-shrink-0 mt-1" size={20} />
                            <div>
                              <p className="font-paragraph text-sm font-semibold text-foreground mb-1">
                                Peluquería veterinaria – Próximamente en nueva dirección
                              </p>
                              <p className="font-paragraph text-sm text-foreground/80">
                                Consultar por WhatsApp para coordinar turnos
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <p className="font-paragraph text-base text-foreground mb-6">
                        {service.description}
                      </p>

                      {service.benefits && (
                        <div className="mb-6">
                          <div className="flex items-start gap-2 mb-2">
                            <CheckCircle className="text-primary flex-shrink-0 mt-1" size={20} />
                            <div>
                              <h4 className="font-heading text-sm font-semibold text-foreground mb-1">
                                Beneficios
                              </h4>
                              <p className="font-paragraph text-sm text-foreground">
                                {service.benefits}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-4 items-center justify-between pt-4 border-t border-gray-200">
                        {service.duration && (
                          <div className="flex items-center gap-2">
                            <Clock className="text-primary" size={20} />
                            <span className="font-paragraph text-sm text-foreground">
                              {service.duration}
                            </span>
                          </div>
                        )}
                        
                        {service.price && (
                          <div className="flex items-center gap-2">
                            <DollarSign className="text-primary" size={20} />
                            <span className="font-heading text-xl font-bold text-primary">
                              ${service.price}
                            </span>
                          </div>
                        )}
                      </div>

                      {isPeluqueria && (
                        <div className="mt-6">
                          <a
                            href="https://wa.me/5491147834584?text=Hola,%20quiero%20consultar%20turno%20de%20peluquer%C3%ADa"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 w-full h-12 px-6 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all"
                          >
                            <MessageCircle size={20} />
                            Consultar turno de peluquería
                          </a>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="w-full bg-background py-20">
        <div className="max-w-[100rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Nuestro Equipo y Clientes Felices
            </h2>
            <p className="font-paragraph text-xl text-foreground max-w-3xl mx-auto">
              Conoce a nuestro equipo profesional y a las mascotas que confían en nosotros
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-2xl overflow-hidden shadow-lg"
            >
              <Image 
                src="https://static.wixstatic.com/media/773a78_4cacbcc7623448e2bae3c46981da9d02~mv2.png" 
                alt="Equipo Milicotas" 
                width={500}
                className="w-full h-80 object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl overflow-hidden shadow-lg"
            >
              <Image 
                src="https://static.wixstatic.com/media/773a78_51abcbb6c44347feacad883f344451df~mv2.png" 
                alt="Veterinario con mascotas" 
                width={500}
                className="w-full h-80 object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-2xl overflow-hidden shadow-lg"
            >
              <Image 
                src="https://static.wixstatic.com/media/773a78_b6f65c8d11bd47d3bd0d6656507f8887~mv2.png" 
                alt="Peluquería canina" 
                width={500}
                className="w-full h-80 object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-white py-20">
        <div className="max-w-[100rem] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              ¿Interesado en Nuestros Servicios?
            </h2>
            <p className="font-paragraph text-xl text-foreground mb-8 max-w-3xl mx-auto">
              Contáctanos para más información o para agendar una cita
            </p>
            <a
              href="/contacto"
              className="inline-block bg-primary text-primary-foreground font-heading font-semibold px-8 py-4 rounded-lg hover:bg-opacity-90 transition-all"
            >
              Contactar Ahora
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
