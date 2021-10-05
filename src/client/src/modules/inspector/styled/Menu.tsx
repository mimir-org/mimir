import styled from "styled-components";
import { Color } from "../../../compLibrary";

const Menu = styled.div`
  display: flex;
  color: ${Color.Black};
  height: 44px;
  width: 100%;
  overflow: hidden;
  padding-top: ${(props: { top: number }) => (props.top ? props.top : 0)}px;
  background-color: ${(props: { color: string }) => props.color}!important;

  &:hover {
    cursor: n-resize;
  }
`;

export default Menu;
