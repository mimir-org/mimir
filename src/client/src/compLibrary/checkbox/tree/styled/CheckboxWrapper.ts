import styled from "styled-components";
import { Color, FontSize } from "../../..";

interface Props {
  color: string;
}

const CheckboxWrapper = styled.label<Props>`
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
    width: 16px;
    transform: scale(0);
    transition: 340ms transform;
    background-color: ${(props) => props.color};
  }

  input:checked::before {
    transform: scale(1);
  }

  .label {
    position: relative;
    bottom: 19px;
    left: 30px;
    max-width: 240px;
    font-size: ${FontSize.Standard};
  }
`;

export default CheckboxWrapper;
