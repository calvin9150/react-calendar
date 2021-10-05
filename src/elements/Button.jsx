import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const { text, _onClick, is_float, children, margin, width, padding } = props;

  if (is_float) {
    return (
      <>
        <FloatButton onClick={_onClick}>{text ? text : children}</FloatButton>
      </>
    );
  }

  const styles = {
    margin: margin,
    width: width,
    padding: padding,
  };

  return (
    <>
      <ElButton {...styles} onClick={_onClick}>
        {text ? text : children}
      </ElButton>
    </>
  );
};

Button.defaultProps = {
  text: false,
  children: null,
  _onClick: () => {},
  is_float: false,
  margin: false,
  width: "100%",
  padding: "12px 0px",
};

const ElButton = styled.button`
  width: ${(props) => props.width};
  background-color: #212121;
  color: #ffffff;
  padding: 12px 0px;
  box-sizing: border-box;
  border: none;
  padding: ${(props) => props.padding};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
`;

const FloatButton = styled.button`
  width: 10em;
  height: 2em;
  background-color: #212121;
  color: #ffffff;
  box-sizing: border-box;
  font-size: 1em;
  font-weight: 800;
  position: fixed;
  bottom: 3em;
  right: 7em;
  text-align: center;
  vertical-align: middle;
  border: none;
  z-index: 9;

  :hover {
    background-color: #1c266d;
  }

  @media screen and (max-width: 720px) {
    bottom: 5em;
  }
`;

export default Button;
