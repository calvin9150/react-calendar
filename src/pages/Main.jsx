import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import Calendar from "../components/Calendar";

// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin: auto;
//   width: 80vw;
//   height: 80vh;
// `;

const Main = () => {
  // const schedule = useSelector((state) => state.calendar.schedules);

  return (
    <>
      <Calendar></Calendar>
    </>
  );
};

export default Main;
