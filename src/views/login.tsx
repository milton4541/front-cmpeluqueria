import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScissors } from '@fortawesome/free-solid-svg-icons';

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    console.log("Login attempt with:", email, password)
  }

  return (
    <div className="flex h-screen">
      {/* Diseño de bienvenida (lado izquierdo) */}
      <div className="w-[30%] bg-gray-900 flex flex-col items-center justify-center text-white p-4">
        <FontAwesomeIcon icon={faScissors} size="3x" />
        <h1 className="text-3xl font-bold mb-2">Bienvenido</h1>
        <p className="text-xl text-center">Peluquería CM</p>
      </div>

      {/* Formulario de login (lado derecho) */}
      <div className="w-[70%] flex items-center justify-center bg-white p-8">
        <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-lg">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                         focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                         focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  )
}