import styled from "styled-components";

export const ParameterButton = styled.button`
  background: transparent;
  position: relative;
  border: 0;
  padding: 0;
  cursor: pointer;

  img,
  svg {
    height: 12px;
    width: 12px;
  }
`;

export const ParameterLockSpinner = styled.span`
  width: 15px;
  height: 15px;
  position: absolute;
  top: 10px;
  right: -8px;
  display: flex;
  transform: translate(-50%, -50%);
`;
