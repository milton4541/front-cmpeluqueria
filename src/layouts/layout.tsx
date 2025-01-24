import { IoMdAdd } from "react-icons/io"; //add icon
import { MdPeopleAlt } from "react-icons/md"; //people icon
import { TbScissors } from "react-icons/tb"; //scissors icon
import { FiBox } from "react-icons/fi"; //box icon
import { IoIosStats } from "react-icons/io"; //stats icon
import { Link } from 'react-router-dom'; 

import { Outlet } from "react-router-dom"; // Importa Outlet para las rutas hijas
import Options from "../components/options";

export default function Layout() {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        <div className="min-h-screen bg-gray-50 flex">
          {/* Barra lateral de navegación */}
          <aside className="w-64 border-r bg-white p-6 overflow-y-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Salon Manager</h1>
            <nav className="space-y-4">
            <div>
              <Options icon={<IoMdAdd size={24} color="black" />} label="Nuevo Turno" />              
              <Link to="/clientes" className="flex items-center">
                <Options icon={<MdPeopleAlt size={24} color="black" />} label="Clientes" />
              </Link>
              <Options icon={<TbScissors size={24} color="black" />} label="Servicios" />
              <Options icon={<FiBox size={24} color="black" />} label="Productos" />
              <Options icon={<IoIosStats size={24} color="black" />} label="Estadísticas" />
              <Options icon={<IoIosStats size={24} color="black" />} label="Configuración" />
            </div>
            </nav>
          </aside>

          {/* Área principal de contenido donde se renderizan las rutas hijas */}
          <main className="flex-1 p-6">
            {/* Aquí se renderizan las rutas hijas */}
            <Outlet />
          </main>
        </div>
      </body>
    </html>
  );
}
