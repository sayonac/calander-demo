"use client";

import { useState } from "react";
import {
  Calendar,
  dateFnsLocalizer,
  Event as RBCEvent,
} from "react-big-calendar";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { startOfWeek } from "date-fns/startOfWeek";
import { getDay } from "date-fns/getDay";
import { enUS } from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);


const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const dummyData: Record<string, any[]> = {
  "06-12-2025": [
    { user_1: 1 },
    { user_2: 2 },
    { user_3: 3 },
    { user_4: 4 },
  ],
  "10-12-2025": [
    { user_1: 1 },
    { user_2: 2 },
    { user_3: 3 },
    { user_4: 4 },
  ],
  "21-12-2025": [
    { user_1: 1 },
    { user_2: 2 },
    { user_3: 3 },
    { user_4: 4 },
  ],
  "19-12-2025": [
    { user_1: 1 },
    { user_2: 2 },
    { user_3: 3 },
    { user_4: 4 },
  ],
};

const events: RBCEvent[] = Object.keys(dummyData).map((key) => {
  const [day, month, year] = key.split("-");
  const date = new Date(+year, +month - 1, +day);

  return {
    title: "Data",
    start: date,
    end: date,
    allDay: true,
  };
});

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);



  const formatKey = (date: Date) =>
    `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()}`;

  const handleSelectSlot = (slotInfo: any) => {
    const clickedDate = slotInfo.start;
  

    setSelectedDate(clickedDate);

  };



  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px", fontSize: "28px" }}>
        React Big Calendar
      </h1>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        views={["month", "week", "day"]}
        defaultView="month"
        style={{
          height: 600,
          border: "2px solid #ccc",
          borderRadius: "8px",
        }}
        onSelectSlot={handleSelectSlot}
        dayPropGetter={(date) => {
          const key = formatKey(date);

          const isSelected =
            selectedDate &&
            date.toDateString() === selectedDate.toDateString();

          const hasData = dummyData[key];

          return {
            style: {
              backgroundColor: isSelected
                ? "#ffe5b4"
                : hasData
                  ? "#d4f7d4"
                  : undefined,
              borderRadius: isSelected ? "6px" : undefined,
            },
          };
        }}
      />

    </div>
  );
}
