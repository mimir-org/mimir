import styled from "styled-components";
import { Color } from "../..";

const MenuElement = styled.div`
  padding: 10px 12px 3px 12px;
  margin-top: 5px;
  color: ${Color.BlueMagenta};
  cursor: ${(props: { logOut: boolean }) => !props.logOut && "pointer"};

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
    background-color: ${(props: { logOut: boolean }) => !props.logOut && Color.DarkGrey};
    text-decoration: ${(props: { logOut: boolean }) => !props.logOut && "underline"};
  }
`;

export default MenuElement;
