import styled from "styled-components";

interface CheckboxWrapperProps {
  color: string;
  marginLeft: number;
}

export const CheckboxWrapper = styled.label<CheckboxWrapperProps>`
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 15px;
  width: 15px;
  background: transparent;
  margin-left: ${(props) => props.marginLeft}px;

  input {
    position: absolute;
    display: none;
  }

  & > svg {
    height: inherit;
    width: inherit;
    fill: ${(props) => props.color};
  }
`;
