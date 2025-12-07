"use client";

import { useSelector, useDispatch } from "react-redux";
// import { RootState, AppDispatch } from "../store"; 
// import { setSelectedDate, setSelectedData, setShowPopup } from "../store/calendarSlice";

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
import { RootState } from "./store";
import { setSelectedData, setSelectedDate, setShowPopup } from "./store/calendarSlice";
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
  const dispatch = useDispatch()
  const selectedDate = useSelector((state: RootState) => state.calendar.selectedDate);
  const selectedData = useSelector((state: RootState) => state.calendar.selectedData);
  const showPopup = useSelector((state: RootState) => state.calendar.showPopup);

  const formatKey = (date: Date) =>
    `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()}`;

  const handleSelectSlot = (slotInfo: any) => {
    const clickedDate = slotInfo.start;
    const key = formatKey(clickedDate);

    dispatch(setSelectedDate(clickedDate.toISOString()));

    if (dummyData[key]) {
      dispatch(setSelectedData(dummyData[key]));
    } else {
      dispatch(setSelectedData(null));
    }

    dispatch(setShowPopup(true));
  };

  const chartData = selectedData
    ? {
        labels: selectedData.map((obj) => Object.keys(obj)[0]),
        datasets: [
          {
            label: "User Data",
            data: selectedData.map((obj) => Object.values(obj)[0]),
            backgroundColor: "rgba(228, 132, 54, 0.6)",
          },
        ],
      }
    : null;

    const selectedDateObj = selectedDate ? new Date(selectedDate) : null;

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px", fontSize: "28px" }}>
        React Big Calendar – Demo
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
            date.toDateString() === selectedDate.toString();

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

      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              width: "400px",
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <h2>{selectedDateObj?.toDateString()}</h2>

            {selectedData ? (
              <Bar data={chartData!} />
            ) : (
              <p style={{ color: "red", fontWeight: "bold" }}>
                No data found for {selectedDate?.toString()}
              </p>
            )}

            <button
              onClick={() => dispatch(setShowPopup(false))}
              style={{
                marginTop: "15px",
                padding: "8px 15px",
                background: "#444",
                color: "#fff",
                borderRadius: "5px",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
