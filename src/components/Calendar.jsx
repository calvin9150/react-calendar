import React, { useState } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import Modal from "./Modal";

const Calendar = () => {
  const schedules = useSelector((state) => state.calendar.schedules);

  const [clicked, setClicked] = useState(false);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [minutes, setMinutes] = useState("");

  const onClickDate = (e) => {
    // console.log(JSON.stringify(e.start).replace(/\"/gi, ""));
    // const time = JSON.stringify(e.start).replace(/\"/gi, "").split("T");
    // console.log(time);
    // const date = time[0];
    // const clock = time[1].split("").splice(0, 8).join("");
    // console.log(date, clock);
    setTitle(e.title);
    const days = dayjs(e.start);
    setYear(days.year());
    setMonth(days.month());
    setDate(days.date());
    setHour(days.hour());
    setMinutes(days.minute());

    console.log(days.hour());
    if (e.title) {
      setClicked(true);
    }
  };

  const closeModal = (e) => {
    setClicked(false);
  };

  return (
    <>
      {clicked && (
        <Modal
          close={closeModal}
          title={title}
          year={year}
          month={month}
          date={date}
          hour={hour}
          minutes={minutes}
        />
      )}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={onClickDate}
        // eventContent={DateEvent}
        events={schedules}
        eventClick={(info) => {
          onClickDate(info.event);
        }}
      />
    </>
  );
};

export default Calendar;
