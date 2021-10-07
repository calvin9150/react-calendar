import { useCallback } from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import Button from "../elements/Button";
import { removeScheduleFB, updateScheduleFB } from "../redux/modules/calendar";

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
    rgba(0, 0, 0, 0.3) 0px 7px 22px -3px, rgba(0, 0, 0, 0.2) 0px -5px 0px inset;

  @media screen and (max-width: 860px) {
    width: 80vw;
    height: 80vh;
  }
`;

const Close = styled.div`
  position: absolute;
  right: 2em;
  font-size: 1.5em;

  :hover {
    background-color: #80808053;
    border-radius: 5px;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

const Contents = styled.div`
  font-size: 1.5em;
  margin-top: 2em;

  div {
    margin: 1em 0;
  }
`;

const Modal = ({ close, title, year, month, date, hour, minutes, sid }) => {
  const ampm = hour >= 12 ? "오후 " + (hour % 12) : "오전 " + (hour % 12);
  const dispatch = useDispatch();

  const onClickRemove = useCallback(() => {
    dispatch(removeScheduleFB(sid));
    alert("삭제했습니다.");
    close();
  }, [sid, close, dispatch]);

  const onClickFinish = useCallback(() => {
    dispatch(updateScheduleFB(sid));
    alert("완료!");
    close();
  }, [sid, close, dispatch]);

  return (
    <>
      <Wrapper>
        <Container>
          <Close onClick={close}>❌</Close>
          <Contents>
            <div>
              📆 {year}년 {month}월 {date}일
            </div>
            <div>
              🕘 {ampm}시 {minutes}분
            </div>
            <div>✅ 할 일 : {title}</div>
          </Contents>
          <Buttons>
            <Button _onClick={onClickRemove} width="30%" margin="1em">
              삭제
            </Button>
            <Button _onClick={onClickFinish} width="30%" margin="1em">
              완료
            </Button>
          </Buttons>
        </Container>
        <Background onClick={close}></Background>
      </Wrapper>
    </>
  );
};

export default Modal;
