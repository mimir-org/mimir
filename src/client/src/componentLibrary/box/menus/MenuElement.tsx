import styled from "styled-components";
import { Color } from "../..";
const MenuElement = styled.div`
  padding: 20px 12px;
  margin-top: 5px;
  color: ${Color.DeepCyan};
  cursor: pointer;

  .text {
    margin-left: 5px;
    display: inline;
    vertical-align: super;
  }

  &:hover {
    text-decoration: underline;
    background-color: ${Color.DeepCyanTransparent};
  }
`;

export default MenuElement;
