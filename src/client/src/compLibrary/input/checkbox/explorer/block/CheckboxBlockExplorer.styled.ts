import styled from "styled-components";
import { Color } from "../../../../../assets/color/Color";
import { FontSize } from "../../../../../assets/font";

interface CheckboxWrapperProps {
  color: string;
}

export const CheckboxWrapper = styled.label<CheckboxWrapperProps>`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  > input {
    appearance: none; // Hide native checkbox
    display: flex;
    cursor: pointer;
    height: 20px;
    width: 20px;
    border: 2px solid ${Color.DAVYS_GREY};
    background-color: ${Color.WHITE};
    border-radius: 3px;
    margin: 0;
  }

  > input::before {
    content: "";
    height: 16px;
    width: 20px;
    background-color: ${(props) => props.color};
    transform: scale(0);
    transition: 250ms transform ease-in-out;
  }

  > input:checked::before {
    transform: scale(1);
    transition: 250ms transform ease-in-out;
  }

  > span {
    max-width: 175px;
    font-size: ${FontSize.STANDARD};
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  > span:hover {
    text-decoration: underline;
  }
`;
