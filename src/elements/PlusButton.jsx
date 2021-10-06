import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

const PlusBtn = styled.div`
  position: fixed;
  width: 1.5em;
  height: 1.5em;
  background-color: gray;
  color: #ffffff;
  box-sizing: border-box;
  font-size: 36px;
  font-weight: 800;
  bottom: 1em;
  right: 1em;
  text-align: center;
  vertical-align: middle;
  border: none;
  border-radius: 10px;
  z-index: 9;
  user-select: none;
  :hover {
    background-color: #2c3352;
  }

  @media screen and (max-width: 860px) {
    bottom: 2em;
  }
`;

const PlusButton = (props) => {
  const onClickPlus = () => {
    history.push("/write");
  };
  return <PlusBtn onClick={onClickPlus}>+</PlusBtn>;
};

export default PlusButton;
