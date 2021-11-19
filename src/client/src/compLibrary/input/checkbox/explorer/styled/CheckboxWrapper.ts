import styled from "styled-components";
import { Color } from "../../../../colors";
import { FontSize } from "../../../../font";

interface Props {
  color: string;
  miniCheckBox: boolean;
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
    border: 2px solid ${Color.GreyHeader};
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
    bottom: 25px;
    left: 14px;
    max-width: 240px;
    font-size: ${FontSize.Standard};
    cursor: pointer;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-wrap: break-word;
  }

  .label:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export default CheckboxWrapper;
