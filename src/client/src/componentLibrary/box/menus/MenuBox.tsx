import styled from "styled-components";
import { Color } from "../../";

const MenuBox = styled.div`
  position: absolute;
  right: ${(props: { right: string }) => props.right && "0px"};
  left: ${(props: { right: string }) => !props.right && "0px"};
  background: ${Color.White};
  padding-bottom: ${(props) => props.right && "6px"};
  height: min-content;
  width: auto;
  min-width: 250px;
  border-style: solid;
  border-color: ${Color.DeepCyan};
  border-width: 0px 2px 2px 2px;
  z-index: 6;
  box-shadow: -1px 4px 5px rgba(0, 0, 0, 0.15);
`;

export default MenuBox;
