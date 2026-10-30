import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './P2_PokeMemory/PokeMem_App.css'
import App from './P0_Gato/App_gato.jsx'
import PokeApp from './P2_PokeMemory/PokeMem_App.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "pokemon",
    element: <PokeApp />
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
