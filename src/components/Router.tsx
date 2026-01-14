import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import ServiciosPage from '@/components/pages/ServiciosPage';
import UbicacionPage from '@/components/pages/UbicacionPage';
import ContactoPage from '@/components/pages/ContactoPage';
import ProductosPage from '@/components/pages/ProductosPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "servicios",
        element: <ServiciosPage />,
        routeMetadata: {
          pageIdentifier: 'servicios',
        },
      },
      {
        path: "ubicacion",
        element: <UbicacionPage />,
        routeMetadata: {
          pageIdentifier: 'ubicacion',
        },
      },
      {
        path: "contacto",
        element: <ContactoPage />,
        routeMetadata: {
          pageIdentifier: 'contacto',
        },
      },
      {
        path: "productos",
        element: <ProductosPage />,
        routeMetadata: {
          pageIdentifier: 'productos',
        },
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
