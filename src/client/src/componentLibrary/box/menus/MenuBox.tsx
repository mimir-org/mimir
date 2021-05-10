import styled from "styled-components";
import { Color, FontType } from "../../";

const MenuBox = styled.div`
  position: absolute;
  right: ${(props: { right: string }) => (props.right ? "0px" : "inherit")};
  left: ${(props: { right: string }) => (props.right ? "inherit" : "0px")};
  background: ${Color.White};
  height: min-content;
  min-width: 250px;
  border-style: solid;
  border-color: ${Color.DeepCyan};
  border-width: 0px 2px 2px 2px;
  font-family: ${FontType.Standard};
  z-index: 1102;
  box-shadow: -1px 4px 5px rgba(0, 0, 0, 0.15);
`;

export default MenuBox;
