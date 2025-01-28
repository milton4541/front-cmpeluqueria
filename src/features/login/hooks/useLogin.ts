import { useState } from "react";
import { login } from "../api/login";
import { showNotification } from "../../../components/notification";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false); // Reinicia el error
    setIsLoading(true); // Muestra el estado de carga

    try {  
      const data = await login(username, password);
      const { token } = data.data; // Extraer el token de la respuesta
  
      // Guardar el token en localStorage
      localStorage.setItem("authToken", token);
      showNotification("success", "Inicio de sesión exitoso");
      console.log("Datos de usuario:", data);
      setIsLoading(false); // Detén el estado de carga
      navigate("/inicio"); // Redirigir a la página de inicio

      //return data;

    } catch (err: any) {
      setError(true);
      showNotification("error", err.response.data.message);
      setIsLoading(false); // Detén el estado de carga incluso si falla
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    error,
    isLoading,
    handleSubmit,
  };
};
