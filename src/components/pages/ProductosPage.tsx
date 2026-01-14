import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const PHONE = "549XXXXXXXXXX";

function whatsappLink(producto: string) {
  const mensaje = `Hola, quiero consultar por el producto ${producto}`;
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(mensaje)}`;
}

const productos = [
  {
    nombre: "Alimento balanceado para perros",
    descripcion: "Distintas marcas y tamaños. Consultar disponibilidad.",
  },
  {
    nombre: "Alimento balanceado para gatos",
    descripcion: "Opciones para todas las edades.",
  },
  {
    nombre: "Antiparasitarios",
    descripcion: "Internos y externos.",
  },
  {
    nombre: "Pipetas",
    descripcion: "Protección mensual contra pulgas y garrapatas.",
  },
  {
    nombre: "Vitaminas veterinarias",
    descripcion: "Suplementos según indicación profesional.",
  },
];

const ProductosPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Productos veterinarios | Milicotas</title>
      </Helmet>

      <section className="bg-white">
        <div className="max-w-[120rem] mx-auto px-6 py-10">
          <div className="flex flex-col gap-2">
            <h1 className="font-heading text-3xl font-bold text-foreground">
              Productos
            </h1>
            <p className="text-base text-foreground/80 max-w-3xl">
              Conocé algunos de los productos veterinarios disponibles. Consultanos por WhatsApp
              para precios y stock.
            </p>

            {/* Migas / link de regreso (opcional, ayuda UX) */}
            <div className="mt-2">
              <Link to="/servicios" className="text-sm text-primary hover:underline">
                ← Volver a Servicios
              </Link>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productos.map((p) => (
              <div
                key={p.nombre}
                className="border border-border rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow bg-white"
              >
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {p.nombre}
                </h3>
                <p className="mt-2 text-sm text-foreground/80">
                  {p.descripcion}
                </p>

                <a
                  href={whatsappLink(p.nombre)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center mt-4 px-4 py-2 rounded-md bg-primary text-white font-semibold hover:opacity-90 transition-opacity"
                >
                  Consultar por WhatsApp
                </a>
              </div>
            ))}
          </div>

          {/* Nota final opcional */}
          <p className="mt-10 text-sm text-foreground/70">
            * La disponibilidad puede variar. Te confirmamos stock y precio por WhatsApp.
          </p>
        </div>
      </section>
    </>
  );
};

export default ProductosPage;

