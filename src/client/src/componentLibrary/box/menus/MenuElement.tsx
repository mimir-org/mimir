import styled from "styled-components";
import { Color } from "../..";
const MenuElement = styled.div`
  padding: 20px 10px;
  margin-top: 5px;
  color: ${Color.DeepCyan};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    background-color: ${Color.DeepCyanTransparent};
  }
`;

export default MenuElement;
