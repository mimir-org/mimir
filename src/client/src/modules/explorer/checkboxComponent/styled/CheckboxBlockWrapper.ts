import styled from "styled-components";
import { Color, FontSize } from "../../../../compLibrary";

interface Props {
  color: string;
  isSelectedNode: boolean;
  isSecondaryNode: boolean;
}

const CheckboxBlockWrapper = styled.label<Props>`
  input[type="checkbox"] {
    position: relative;
    margin-left: 0px;
    cursor: pointer;
    appearance: none;
    display: grid;
    place-content: center;
    height: 18px;
    width: 18px;
    border: 2px solid ${Color.BlueMagenta};
    background-color: ${Color.White};
    border-radius: 3px;
    transform: translateY(-0.075em);
  }

  input[type="checkbox"]::before {
    content: "";
    height: ${(props) => (props.isSelectedNode || props.isSecondaryNode ? 14 : 8)}px;
    width: ${(props) => (props.isSelectedNode || props.isSecondaryNode ? 14 : 8)}px;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    background-color: ${(props) => props.color};
  }

  input[type="checkbox"]:checked::before {
    transform: scale(1);
  }

  .label {
    position: relative;
    top: 4px;
    left: 25px;
    font-size: ${FontSize.Medium};
  }
`;

export default CheckboxBlockWrapper;
