import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Button from "../elements/Button";
import { history } from "../redux/configureStore";
import { addScheduleFB } from "../redux/modules/calendar";

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  user-select: none;
  z-index: 9;
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  background-color: #80808075;
`;
const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 35vw;
  height: 50vh;
  vertical-align: middle;
  background-color: white;
  z-index: 9999;
  border-radius: 20px;
  padding: 2em;

  @media screen and (max-width: 720px) {
    width: 80vw;
    height: 80vh;
  }
`;
const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin-top: 5em;
  input {
    margin: 1em 0;
    width: 100%;
    height: 2em;
  }
`;
const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;
const Edit = (props) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [inputTitle, setInputTitle] = useState("");

  const dispatch = useDispatch();

  const onChangedDate = (e) => {
    setSelectedDate(e.target.value);
  };

  const onChangedTime = (e) => {
    setSelectedTime(e.target.value);
  };

  const onChangedTitle = (e) => {
    setInputTitle(e.target.value);
  };

  const onClickSubmitBtn = () => {
    const date = selectedDate + "T" + selectedTime;
    dispatch(addScheduleFB({ date: date, title: inputTitle, finished: false }));
  };

  const onClickCancle = () => {
    history.replace("/");
  };

  return (
    <>
      <Wrapper>
        <Background />
        <Container>
          <InputWrap>
            <input type="text" onChange={onChangedTitle} />
            <input type="date" onChange={onChangedDate} />
            <input type="time" onChange={onChangedTime} />
          </InputWrap>
          <Buttons>
            <Button _onClick={onClickCancle} width="30%" margin="1em">
              취소
            </Button>
            <Button _onClick={onClickSubmitBtn} width="30%" margin="1em">
              제출
            </Button>
          </Buttons>
        </Container>
      </Wrapper>
    </>
  );
};

export default Edit;
