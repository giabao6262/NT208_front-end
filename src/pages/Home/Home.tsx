import React from "react";
import GoogleCalendar from "../../components/calendar/calendar";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex  bg-gray-100">
      <GoogleCalendar />
    </div>
  );
};

export default HomePage;
