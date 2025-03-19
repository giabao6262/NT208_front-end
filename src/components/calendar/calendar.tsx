import React, { useState, useMemo } from "react";
import {
  format,
  addWeeks,
  subWeeks,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  eachHourOfInterval,
  startOfToday,
  addMonths,
  subMonths,
} from "date-fns";

const GoogleCalendar: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(startOfToday());

  const prevWeek = () => setCurrentWeek(subWeeks(currentWeek, 1));
  const nextWeek = () => setCurrentWeek(addWeeks(currentWeek, 1));
  const prevMonth = () => setSelectedDate(subMonths(selectedDate, 1));
  const nextMonth = () => setSelectedDate(addMonths(selectedDate, 1));

  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(currentWeek, { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const hours = useMemo(
    () =>
      eachHourOfInterval({
        start: new Date().setHours(0, 0, 0, 0),
        end: new Date().setHours(23, 0, 0, 0),
      }),
    []
  );

  const today = startOfToday();
  const currentHour = new Date().getHours();

  return (
    <div className="w-full max-w-7xl ml-0 p-4 bg-white rounded-lg shadow-md flex justify-start items-start self-start">
      {/* Sidebar Calendar */}
      <div className="w-1/4 p-4 border-r text-center">
        <div className="flex justify-between items-center mb-2">
          <button
            onClick={prevMonth}
            className="px-2 py-1 bg-gray-200 rounded"
            aria-label="Previous month"
          >
            ❮
          </button>
          <h3 className="text-lg font-semibold">
            Tháng {format(selectedDate, "M, yyyy")}
          </h3>
          <button
            onClick={nextMonth}
            className="px-2 py-1 bg-gray-200 rounded"
            aria-label="Next month"
          >
            ❯
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {[...Array(31)].map((_, i) => {
            const day = new Date(
              selectedDate.getFullYear(),
              selectedDate.getMonth(),
              i + 1
            );
            return (
              <button
                key={i}
                onClick={() => setCurrentWeek(day)}
                className={`p-2 rounded-full ${
                  format(day, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200"
                }`}
                aria-label={`Select day ${i + 1}`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Calendar */}
      <div className="w-3/4 p-4 text-center">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={prevWeek}
            className="px-4 py-2 bg-gray-200 rounded"
            aria-label="Previous week"
          >
            ❮
          </button>
          <button
            onClick={() => {
              const today = startOfToday();
              setCurrentWeek(today);
              setSelectedDate(today); // Cập nhật tháng về tháng chứa ngày hôm nay
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded ml-[-90px]"
            aria-label="Today"
          >
            Today
          </button>

          <h2 className="text-xl font-semibold">
            {format(weekStart, "MMMM d, yyyy")} -{" "}
            {format(weekEnd, "MMMM d, yyyy")}
          </h2>
          <button
            onClick={nextWeek}
            className="px-4 py-2 bg-gray-200 rounded"
            aria-label="Next week"
          >
            ❯
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-8 border-t border-gray-300 text-center">
          <div className="border-r border-gray-300 bg-gray-100 font-semibold py-2">
            GMT+07
          </div>
          {days.map((day) => (
            <div
              key={day.toISOString()}
              className={`border-r border-gray-300 font-semibold py-2 ${
                format(day, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")
                  ? "bg-blue-100"
                  : ""
              }`}
            >
              {format(day, "E d")}
            </div>
          ))}
        </div>

        {/* Time Slots */}
        <div className="grid grid-cols-8 divide-x">
          <div className="border-r border-gray-300 bg-gray-100 text-center">
            {hours.map((hour) => (
              <div
                key={hour.toISOString()}
                className={`h-10 text-xs border-b border-gray-300 ${
                  new Date(hour).getHours() === currentHour ? "bg-blue-200" : ""
                }`}
              >
                {format(hour, "HH:mm")}
              </div>
            ))}
          </div>
          {days.map((day) => (
            <div key={day.toISOString()} className="border-r border-gray-300">
              {hours.map((hour) => (
                <div
                  key={`${day.toISOString()}-${hour.toISOString()}`}
                  className="h-10 border-b border-gray-300 hover:bg-gray-100 relative"
                >
                  {format(day, "yyyy-MM-dd") === format(today, "yyyy-MM-dd") &&
                  new Date(hour).getHours() === currentHour ? (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-red-500 rounded-full"></div>
                  ) : null}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GoogleCalendar;
