import styled from "styled-components";
import { Color } from "../..";

interface Props {
  logOut?: boolean;
}

const MenuElement = styled.div<Props>`
  padding: 6px 12px;
  margin-top: 5px;
  color: ${Color.BlueMagenta};
  cursor: ${(props) => !props.logOut && "pointer"};

  .text {
    margin-left: 12px;
    display: inline;
    vertical-align: super;
  }

  .icon {
    display: inline;
    position: relative;
    bottom: 3px;
  }

  &:hover {
    background-color: ${(props) => !props.logOut && Color.DarkGrey};
    text-decoration: ${(props) => !props.logOut && "underline"};
  }
`;

export default MenuElement;
