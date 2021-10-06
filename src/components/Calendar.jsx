import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import Modal from "./Modal";
import { getScheduleFB } from "../redux/modules/calendar";
import Button from "../elements/Button";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  margin: auto;
`;

const Calendar = () => {
  const schedules = useSelector((state) => state.calendar.schedules);
  const finishedSchedules = schedules.filter((v) => v.finished === true);
  const dispatch = useDispatch();

  const [clicked, setClicked] = useState(false);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [minutes, setMinutes] = useState("");
  const [sid, setSid] = useState("");
  const [showFinished, setShowFinished] = useState(false);

  useEffect(() => {
    dispatch(getScheduleFB());
  }, []);

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
    setSid(e._def?.publicId);
    console.log(schedules);
    if (e.title) {
      setClicked(true);
    }
  };

  const closeModal = (e) => {
    setClicked(false);
  };

  const onClickShowFinish = () => {
    setShowFinished(true);
  };

  const onClickShowAll = () => {
    setShowFinished(false);
  };

  return (
    <>
      <Wrapper>
        {clicked && (
          <Modal
            close={closeModal}
            title={title}
            year={year}
            month={month}
            date={date}
            hour={hour}
            minutes={minutes}
            sid={sid}
          />
        )}
        {!showFinished ? (
          <Button is_float _onClick={onClickShowFinish}>
            완료된 일정만 보기
          </Button>
        ) : (
          <Button is_float _onClick={onClickShowAll}>
            전체 일정 보기
          </Button>
        )}

        <FullCalendar
          height="100vh"
          width="100vh"
          headerToolbar={{
            start: "today",
            center: "title",
            end: "prev,next",
          }}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          dateClick={onClickDate}
          // eventContent={DateEvent}
          events={showFinished ? finishedSchedules : schedules}
          eventClick={(info) => {
            onClickDate(info.event);
          }}
        />
      </Wrapper>
    </>
  );
};

export default Calendar;
