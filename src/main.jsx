import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './P3_ShoppingCart/FakeShop.css'
import Home from './P3_ShoppingCart/pages/Home';
import Shop from './P3_ShoppingCart/pages/Shop';
import Cart from './P3_ShoppingCart/pages/Cart';
import Navbar from './P3_ShoppingCart/components/Navbar';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {index: true, element: <Home />},
      {path: "shop", element: <Shop />},
      {path: "cart", element: <Cart />},
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
