import styled from "styled-components";
import { Color } from "../..";

const MenuElement = styled.div`
  padding: 20px 12px;
  margin-top: 5px;
  color: ${Color.DeepCyan};
  cursor: ${(props) => (props.logOut ? "initial" : "pointer")};

  .text {
    margin-left: 5px;
    display: inline;
    vertical-align: super;
  }

  &:hover {
    background-color: ${(props) =>
      props.logOut ? "inherit" : `${Color.DeepCyanTransparent}`};
    text-decoration: ${(props) => (props.logOut ? "none" : "underline")};
  }
`;

export default MenuElement;
