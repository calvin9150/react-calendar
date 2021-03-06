import React from "react";
// import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import Calendar from "../components/Calendar";
import PlusButton from "../elements/PlusButton";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 80vh;

  @media screen and (max-width: 860px) {
    display: flex;
    justify-content: center;
    margin: auto;
    width: 100vw;
    height: 80vh;
  }
`;

const Main = () => {
  // const schedule = useSelector((state) => state.calendar.schedules);

  return (
    <>
      <Container>
        <Calendar></Calendar>
      </Container>
      <PlusButton>+</PlusButton>
    </>
  );
};

export default Main;
