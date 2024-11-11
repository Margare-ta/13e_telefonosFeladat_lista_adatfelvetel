import React from 'react';
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TelefonFelvetel from './components/TelefonFelvetel';
import Telefontorles from './components/TelefonTorles';
import Telefonlista from './components/TelefonLista';
import TelefonReszletek from './components/TelefonReszletek';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Telefonlista />,
  },
  {
    path: "/telefonok",
    element: <Telefonlista />,
  },  
  {
    path: "/telefonfelvetel",
    element: <TelefonFelvetel />,
  },
  {
    path: "/telefontorles",
    element: <Telefontorles />,
  },
  {
    path: "/telefonok/:phoneId",
    element: <TelefonReszletek />
  }
]);


createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
