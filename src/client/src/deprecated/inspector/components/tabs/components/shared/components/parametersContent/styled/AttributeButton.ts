import styled from "styled-components";

export const AttributeButton = styled.button`
  background: transparent;
  display: flex;
  align-items: center;
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

export const AttributeLockSpinner = styled.span`
  width: 15px;
  height: 15px;
  position: absolute;
  top: 7px;
  right: -8px;
  display: flex;
  transform: translate(-50%, -50%);
`;
