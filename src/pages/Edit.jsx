import React, { useCallback, useState } from "react";
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
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;

  @media screen and (max-width: 860px) {
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
    height: 3em;
  }
  @media screen and (max-width: 860px) {
    width: 100%;
  }
`;

const AlertText = styled.div`
  font-size: 0.8em;
  color: red;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;
const Edit = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [inputTitle, setInputTitle] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [timeError, setTimeError] = useState(false);

  const dispatch = useDispatch();

  const onChangedDate = useCallback((e) => {
    setSelectedDate(e.target.value);
    setDateError(false);
  }, []);

  const onChangedTime = useCallback((e) => {
    setSelectedTime(e.target.value);
    setTimeError(false);
  }, []);

  const onChangedTitle = useCallback((e) => {
    const value = e.target.value.trim();
    setInputTitle(value);
    if (value) {
      setTitleError(false);
    }
  }, []);

  const onClickSubmitBtn = () => {
    if (selectedDate && selectedTime && inputTitle.trim()) {
      const date = selectedDate + "T" + selectedTime;
      dispatch(
        addScheduleFB({ date: date, title: inputTitle, finished: false })
      );
      return;
    }
    checkTitle();
    checkDate();
    checkTime();
  };

  const onClickCancle = useCallback(() => {
    history.replace("/");
  }, []);

  const checkTitle = useCallback(() => {
    if (!inputTitle.trim()) {
      setTitleError(true);
    }
  }, [inputTitle]);

  const checkDate = useCallback(() => {
    if (!selectedDate) setDateError(true);
  }, [selectedDate]);

  const checkTime = useCallback(() => {
    if (!selectedTime) setTimeError(true);
  }, [selectedTime]);

  return (
    <>
      <Wrapper>
        <Background />
        <Container>
          <InputWrap>
            <input type="text" onChange={onChangedTitle} />
            {titleError && <AlertText>?????? ????????? ???????????????.</AlertText>}
            <input type="date" onChange={onChangedDate} />
            {dateError && <AlertText>????????? ???????????????.</AlertText>}
            <input type="time" onChange={onChangedTime} />
            {timeError && <AlertText>????????? ???????????????.</AlertText>}
          </InputWrap>
          <Buttons>
            <Button _onClick={onClickCancle} width="30%" margin="1em">
              ??????
            </Button>
            <Button _onClick={onClickSubmitBtn} width="30%" margin="1em">
              ??????
            </Button>
          </Buttons>
        </Container>
      </Wrapper>
    </>
  );
};

export default Edit;
