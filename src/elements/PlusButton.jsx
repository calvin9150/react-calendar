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
  border-radius: 50px;
  z-index: 9;
  user-select: none;
`;

const PlusButton = (props) => {
  const onClickPlus = () => {
    history.push("/write");
  };
  return <PlusBtn onClick={onClickPlus}> +</PlusBtn>;
};

export default PlusButton;
