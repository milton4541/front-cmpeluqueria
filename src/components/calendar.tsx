import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { getTurnos } from "../services/api/getTurnos";
import interactionPlugin from "@fullcalendar/interaction";
import AppointmentModal from "./addDateModal";
import { turno } from "../services/types/turno";

const CalendarPage = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleDateClick = (arg: any) => {
    setSelectedDate(arg.dateStr);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
          const apiResponse = await getTurnos(); // apiResponse es turno[]
          const apiEvents = apiResponse.map((turno: turno) => {
          const [datePart, timePart] = turno.appointment_date.split(" ");
          const [day, month, year] = datePart.split("/");
          const isoDate = `${year}-${month}-${day}T${timePart}:00`;
          const startDate = new Date(isoDate);
          const endDate = new Date(
            startDate.getTime() + turno.estimated_time_minutes * 60000
          ).toISOString();

          return {
            title: `Cita: ${turno.client_name}`,
            start: isoDate,
            end: endDate,
          };
        });
        setEvents(apiEvents);
        console.log("Eventos a mostrar:", events);
      } catch (error) {
        console.error("Error fetching turnos:", error);
      }
    };

    fetchTurnos();
  }, []);

  return (
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Calendario</h1>
      <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      events={events}
      dateClick={handleDateClick}
      editable={true}
      selectable={true}
      locale="es"
      buttonText={{
        today: "Hoy",
        month: "Mes",
        week: "Semana",
        day: "Día",
      }}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
      slotDuration="00:30:00"
      slotLabelInterval="00:30:00"
      slotLabelFormat={{
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }}
      slotMinTime="06:00:00"
      slotMaxTime="22:00:00"
      height="auto"
    />
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default CalendarPage;
