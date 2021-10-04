import styled from "styled-components";

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
  width: 35vw;
  height: 50vh;
  vertical-align: middle;
  background-color: white;
  z-index: 9999;
  border-radius: 20px;
  padding: 2em;
`;

const Modal = ({ close, title, year, month, date, hour, minutes }) => {
  return (
    <>
      <Wrapper>
        <Container>
          <div>
            날짜 : {year}년 {month}월 {date}일
          </div>
          <div>
            시간 : {hour}시 {minutes}분
          </div>
          <div>할 일 : {title}</div>
          <button onClick={close}>취소</button>
          <button>완료</button>
        </Container>
        <Background onClick={close}></Background>
      </Wrapper>
    </>
  );
};

export default Modal;
