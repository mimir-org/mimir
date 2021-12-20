import styled from "styled-components";
import { Color } from "../../../../colors";
import { FontSize } from "../../../../font";

interface Props {
  color: string;
  miniCheckBox: boolean;
  isBlockView: boolean;
  isAspectNode: boolean;
}

const CheckboxWrapper = styled.label<Props>`
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
    border: 2px solid ${Color.GreyHeader};
    background-color: ${Color.White};
    border-radius: 3px;
    margin: 0;
  }

  > input::before {
    content: "";
    height: ${(props) => (!props.miniCheckBox ? 16 : 8)}px;
    width: ${(props) => (!props.miniCheckBox ? 20 : 14)}px;
    background-color: ${(props) => props.color};
    transform: scale(0);
    transition: 250ms transform ease-in-out;
  }

  > input:checked::before {
    transform: scale(1);
    margin: ${(props) => props.miniCheckBox && "4px"};
    transition: 250ms transform ease-in-out;
  }

  > span {
    max-width: 175px;
    font-size: ${FontSize.Standard};
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  > span:hover {
    text-decoration: underline;
  }
`;

export default CheckboxWrapper;
