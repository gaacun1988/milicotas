import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MapPin, Clock, Phone, Navigation } from 'lucide-react';

export default function UbicacionPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-primary to-logo-accent2 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image 
            src="https://static.wixstatic.com/media/773a78_a33421450bf24c498c72a11eb28b145d~mv2.png" 
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
              Nuestra Ubicación
            </h1>
            <p className="font-paragraph text-xl text-primary-foreground max-w-3xl mx-auto">
              Visítanos en nuestra clínica veterinaria en Buenos Aires
            </p>
          </motion.div>
        </div>
      </section>

      {/* Map and Info Section */}
      <section className="w-full py-20">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl overflow-hidden shadow-xl"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.8267899999997!2d-58.4489!3d-34.5789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb5d7f7c7c7c7%3A0x7c7c7c7c7c7c7c7c!2sPalpa%202465%2C%20C1426%20CABA!5e0!3m2!1ses!2sar!4v1234567890"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Milicotas"
              ></iframe>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-8"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                  Información de Contacto
                </h2>

                <div className="flex flex-col gap-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary bg-opacity-10 p-3 rounded-lg">
                      <MapPin className="text-primary" size={28} />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                        Dirección
                      </h3>
                      <p className="font-paragraph text-base text-foreground">
                        Palpa 2465, C1426 CABA<br />
                        Autónoma de Buenos Aires
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary bg-opacity-10 p-3 rounded-lg">
                      <Clock className="text-primary" size={28} />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                        Horarios de Atención
                      </h3>
                      <p className="font-paragraph text-base text-foreground">
                        Abierto<br />
                        Cierra a las 19:00
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary bg-opacity-10 p-3 rounded-lg">
                      <Phone className="text-primary" size={28} />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                        Teléfono
                      </h3>
                      <a
                        href="tel:01147834584"
                        className="font-paragraph text-base text-primary hover:underline"
                      >
                        011 4783-4584
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary rounded-2xl p-8 shadow-lg">
                <h3 className="font-heading text-2xl font-bold text-primary-foreground mb-4">
                  ¿Cómo Llegar?
                </h3>
                <p className="font-paragraph text-base text-primary-foreground mb-6">
                  Estamos ubicados en el barrio de Belgrano, Buenos Aires. Puedes llegar fácilmente en transporte público o en auto.
                </p>
                <a
                  href="https://maps.app.goo.gl/aZtn6iVjtEnVBoQ29"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-primary font-heading font-semibold px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all"
                >
                  <Navigation size={20} />
                  Abrir en Google Maps
                </a>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
                  Visítanos
                </h3>
                <p className="font-paragraph text-base text-foreground mb-4">
                  Te esperamos en nuestra clínica para brindarte la mejor atención veterinaria. No dudes en visitarnos sin cita previa o contáctanos para agendar una consulta.
                </p>
                <a
                  href="/contacto"
                  className="inline-block bg-primary text-primary-foreground font-heading font-semibold px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all"
                >
                  Contactar Ahora
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="w-full py-20 bg-white">
        <div className="max-w-[100rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Nuestras Instalaciones
            </h2>
            <p className="font-paragraph text-xl text-foreground max-w-3xl mx-auto">
              Conoce nuestro espacio diseñado para el bienestar de tus mascotas
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl overflow-hidden shadow-lg"
            >
              <Image 
                src="https://static.wixstatic.com/media/773a78_c48a3a9c68a145b4b9b46827cc4926f8~mv2.png" 
                alt="Interior tienda" 
                width={500}
                className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl overflow-hidden shadow-lg"
            >
              <Image 
                src="https://static.wixstatic.com/media/773a78_f21f4e730e7145c091d8721587463486~mv2.png" 
                alt="Pasillo clínica" 
                width={500}
                className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-2xl overflow-hidden shadow-lg"
            >
              <Image 
                src="https://static.wixstatic.com/media/773a78_25ca6a7b1fd5447c85cb881a6f2f2c2b~mv2.png" 
                alt="Veterinaria con mascota" 
                width={500}
                className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="rounded-2xl overflow-hidden shadow-lg"
            >
              <Image 
                src="https://static.wixstatic.com/media/773a78_dcfef254e7ce48e9bbfdfbacf850aa0e~mv2.png" 
                alt="Productos veterinarios" 
                width={500}
                className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="rounded-2xl overflow-hidden shadow-lg"
            >
              <Image 
                src="https://static.wixstatic.com/media/773a78_b0321542a4614a16b55ec0add6671e99~mv2.png" 
                alt="Interior pet shop" 
                width={500}
                className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="rounded-2xl overflow-hidden shadow-lg"
            >
              <Image 
                src="https://static.wixstatic.com/media/773a78_c0175e8a96ff4938975786ccf27fa72d~mv2.png" 
                alt="Fachada Milicotas" 
                width={500}
                className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
