import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notification: React.FC = () => {
  return <ToastContainer />;
};

// Función para mostrar notificaciones
export const showNotification = (type: "success" | "error" | "info" | "warn", message: string) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "info":
      toast.info(message);
      break;
    case "warn":
      toast.warn(message);
      break;
    default:
      break;
  }
};

export default Notification;
