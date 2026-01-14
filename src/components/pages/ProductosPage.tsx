import React from "react";
import { Helmet } from "react-helmet";

const PHONE = "549XXXXXXXXXX";

function whatsappLink(producto: string) {
  const mensaje = `Hola, quiero consultar por el producto ${producto}`;
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(mensaje)}`;
}

const productos = [
  {
    nombre: "Alimento balanceado para perros",
    descripcion: "Distintas marcas y tamaños. Consultar disponibilidad."
  },
  {
    nombre: "Alimento balanceado para gatos",
    descripcion: "Opciones para todas las edades."
  },
  {
    nombre: "Antiparasitarios",
    descripcion: "Internos y externos."
  },
  {
    nombre: "Pipetas",
    descripcion: "Protección mensual contra pulgas y garrapatas."
  },
  {
    nombre: "Vitaminas veterinarias",
    descripcion: "Suplementos según indicación profesional."
  }
];

const ProductosPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Productos veterinarios | Milicotas</title>
      </Helmet>

      <section style={{ padding: "2rem" }}>
        <h1>Productos</h1>
        <p>
          Conocé algunos de los productos veterinarios disponibles.
          Consultanos por WhatsApp para precios y stock.
        </p>

        <div style={{ display: "grid", gap: "1.5rem", marginTop: "2rem" }}>
          {productos.map((p) => (
            <div
              key={p.nombre}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "1rem"
              }}
            >
              <h3>{p.nombre}</h3>
              <p>{p.descripcion}</p>

              <a
                href={whatsappLink(p.nombre)}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: "0.5rem",
                  padding: "0.6rem 1rem",
                  backgroundColor: "#25D366",
                  color: "#fff",
                  borderRadius: "4px",
                  textDecoration: "none"
                }}
              >
                Consultar por WhatsApp
              </a>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default ProductosPage;

