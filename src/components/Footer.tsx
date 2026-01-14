import { MapPin, Clock, Phone, Instagram } from 'lucide-react';
import { Image } from '@/components/ui/image';

export default function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="max-w-[100rem] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and Description */}
          <div className="flex flex-col gap-4">
            <Image
              src="https://static.wixstatic.com/media/773a78_2c473bcf8519408fa410f29884f19296~mv2.png"
              alt="Milicotas Logo"
              width={180}
              className="h-24 w-auto object-contain"
            />
            <p className="font-paragraph text-base text-gray-300">
              Tu clínica veterinaria de confianza. Atención personalizada y profesional para tus mascotas.
            </p>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col gap-4">
            <h3 className="font-heading text-xl font-bold text-primary-foreground">Información de Contacto</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <MapPin className="text-primary flex-shrink-0 mt-1" size={20} />
                <p className="font-paragraph text-sm text-gray-300">
                  Palpa 2465, C1426 CABA, Autónoma de Buenos Aires
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-primary flex-shrink-0" size={20} />
                <p className="font-paragraph text-sm text-gray-300">011 4783-4584</p>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="text-primary flex-shrink-0" size={20} />
                <p className="font-paragraph text-sm text-gray-300">Abierto • Cierra a las 19:00</p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex flex-col gap-4">
            <h3 className="font-heading text-xl font-bold text-primary-foreground">Síguenos</h3>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-opacity-80 transition-all p-3 rounded-lg"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
            </div>
            <p className="font-paragraph text-sm text-gray-300 mt-4">
              Visítanos en nuestras redes sociales para conocer más sobre nuestros servicios y novedades.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="font-paragraph text-sm text-gray-400">
            © {new Date().getFullYear()} Milicotas. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
