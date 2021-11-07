import styled from "styled-components";
import { Color, FontSize } from "../../../../compLibrary";

interface Props {
  color: string;
  miniCheckBox: boolean;
}

const CheckboxBlockWrapper = styled.label<Props>`
  input {
    appearance: none; // Hide native checkbox
    position: relative;
    display: flex;
    top: 2px;
    cursor: pointer;
    height: 20px;
    width: 20px;
    border: 2px solid ${Color.BlueMagenta};
    background-color: ${Color.White};
    border-radius: 3px;
  }

  input::before {
    content: "";
    height: ${(props) => (!props.miniCheckBox ? 16 : 8)}px;
    width: ${(props) => (!props.miniCheckBox ? 20 : 14)}px;
    background-color: ${(props) => props.color};
    transform: scale(0);
    transition: 250ms transform ease-in-out;
  }

  input:checked::before {
    transform: scale(1);
    margin: ${(props) => props.miniCheckBox && "4px"};
    transition: 250ms transform ease-in-out;
  }

  .label {
    position: relative;
    bottom: 19px;
    left: 30px;
    max-width: 240px;
    font-size: ${FontSize.Standard};
  }
`;

export default CheckboxBlockWrapper;
