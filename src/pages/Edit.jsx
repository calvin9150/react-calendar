import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { history } from "../redux/configureStore";
import { addScheduleFB } from "../redux/modules/calendar";

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

  useEffect(() => {
    console.log(selectedDate);
    console.log(selectedTime);
  }, [selectedDate, selectedTime]);

  return (
    <>
      <input type="text" onChange={onChangedTitle} />
      <input type="date" onChange={onChangedDate} />
      <input type="time" onChange={onChangedTime} />
      <button onClick={onClickCancle}>취소</button>
      <button onClick={onClickSubmitBtn}>제출</button>
      <div>edit</div>
    </>
  );
};

export default Edit;
