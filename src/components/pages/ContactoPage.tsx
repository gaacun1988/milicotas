import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });

    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-primary to-logo-accent2 py-20">
        <div className="max-w-[100rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-primary-foreground mb-6">
              Contáctanos
            </h1>
            <p className="font-paragraph text-xl text-primary-foreground max-w-3xl mx-auto">
              Estamos aquí para ayudarte. Envíanos tu consulta y te responderemos a la brevedad
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="w-full py-20">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-xl"
            >
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                Envíanos un Mensaje
              </h2>

              {submitSuccess && (
                <div className="bg-primary bg-opacity-10 border border-primary text-primary rounded-lg p-4 mb-6">
                  <p className="font-paragraph text-sm">
                    ¡Gracias por contactarnos! Te responderemos pronto.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="font-heading text-sm font-semibold text-foreground mb-2 block"
                  >
                    Nombre Completo *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    className="w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="font-heading text-sm font-semibold text-foreground mb-2 block"
                  >
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    className="w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="font-heading text-sm font-semibold text-foreground mb-2 block"
                  >
                    Teléfono
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="011 1234-5678"
                    className="w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="font-heading text-sm font-semibold text-foreground mb-2 block"
                  >
                    Asunto *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Motivo de tu consulta"
                    className="w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="font-heading text-sm font-semibold text-foreground mb-2 block"
                  >
                    Mensaje *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                    rows={6}
                    className="w-full"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary text-primary-foreground hover:bg-opacity-90 font-heading font-semibold px-8 py-6 rounded-lg text-base flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-primary-foreground"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Enviar Mensaje
                    </>
                  )}
                </Button>
              </form>
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
                      <p className="font-paragraph text-sm text-foreground mt-1">
                        Lunes a Sábado: 9:00 - 19:00
                      </p>
                    </div>
                  </div>

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
                      <a
                        href="https://maps.app.goo.gl/aZtn6iVjtEnVBoQ29"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-paragraph text-sm text-primary hover:underline mt-1 inline-block"
                      >
                        Ver en Google Maps
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary bg-opacity-10 p-3 rounded-lg">
                      <Mail className="text-primary" size={28} />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                        Instagram
                      </h3>
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-paragraph text-base text-primary hover:underline"
                      >
                        @milicotas
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary rounded-2xl p-8 shadow-lg">
                <h3 className="font-heading text-2xl font-bold text-primary-foreground mb-4">
                  Horarios de Atención
                </h3>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="font-paragraph text-base text-primary-foreground">
                      Lunes - Viernes
                    </span>
                    <span className="font-heading text-base font-semibold text-primary-foreground">
                      9:00 - 19:00
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-paragraph text-base text-primary-foreground">
                      Sábados
                    </span>
                    <span className="font-heading text-base font-semibold text-primary-foreground">
                      9:00 - 19:00
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-paragraph text-base text-primary-foreground">
                      Domingos
                    </span>
                    <span className="font-heading text-base font-semibold text-primary-foreground">
                      Cerrado
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
                  ¿Necesitas Atención Urgente?
                </h3>
                <p className="font-paragraph text-base text-foreground mb-4">
                  Si tu mascota necesita atención veterinaria urgente, llámanos directamente al teléfono o visítanos en nuestra clínica.
                </p>
                <a
                  href="tel:01147834584"
                  className="inline-block bg-primary text-primary-foreground font-heading font-semibold px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all"
                >
                  Llamar Ahora
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
