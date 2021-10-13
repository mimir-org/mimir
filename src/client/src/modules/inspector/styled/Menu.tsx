import styled from "styled-components";
import { Color } from "../../../compLibrary";

interface Props {
  top?: number;
  color: string;
}

const Menu = styled.div<Props>`
  display: flex;
  color: ${Color.Black};
  height: 44px;
  width: 100%;
  overflow: hidden;
  padding-top: ${(props) => (props.top ? props.top : 0)}px;
  background-color: ${(props) => props.color}!important;
`;

export default Menu;
