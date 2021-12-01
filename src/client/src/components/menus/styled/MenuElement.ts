import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";

interface Props {
  disabled: boolean;
  logOut?: boolean;
}

const MenuElement = styled.div<Props>`
  padding: 10px 20px 3px 25px;
  margin-top: 5px;
  color: ${Color.BlueMagenta};
  cursor: ${(props) => !props.logOut && "pointer"};

  .text {
    margin-left: 12px;
    display: inline;
    vertical-align: super;
    font-weight: ${(props) => props.disabled && 300};
    font-style: ${(props) => props.disabled && "italic"};
  }

  .icon {
    display: inline;
    position: relative;
    bottom: 3px;
  }

  &:hover {
    background-color: ${(props) => !props.logOut && !props.disabled && Color.BlueLight};
    text-decoration: ${(props) => !props.logOut && !props.disabled && "underline"};
  }
`;

export default MenuElement;
