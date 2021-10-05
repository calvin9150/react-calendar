import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import styled from "styled-components";

import Calendar from "../components/Calendar";
import PlusButton from "../elements/PlusButton";

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
      <PlusButton>+</PlusButton>
    </>
  );
};

export default Main;
