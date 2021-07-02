import styled from "styled-components";
import { Color } from "../..";

const MenuElement = styled.div`
  padding: 6px 12px;
  margin-top: 5px;
  color: ${Color.DeepCyan};
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
    background-color: ${(props) =>
      !props.logOut && `${Color.DeepCyanTransparent}`};
    text-decoration: ${(props) => !props.logOut && "underline"};
  }
`;

export default MenuElement;
