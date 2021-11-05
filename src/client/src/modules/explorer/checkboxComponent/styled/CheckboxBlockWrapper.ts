import styled from "styled-components";
import { Color, FontSize } from "../../../../compLibrary";

interface Props {
  color: string;
  isSelectedNode: boolean;
  isSecondaryNode: boolean;
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
    height: ${(props) => (props.isSelectedNode || props.isSecondaryNode ? 16 : 10)}px;
    width: ${(props) => (props.isSelectedNode || props.isSecondaryNode ? 16 : 12)}px;
    transform: scale(0);
    transition: 250ms transform ease-in-out;
    background-color: ${(props) => props.color};
  }

  input:checked::before {
    transform: scale(1);
    margin: ${(props) => !props.isSelectedNode && !props.isSecondaryNode && "3px 3px 3px 3px"};
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
