import styled from "styled-components";
import { Color } from "../../";
import Size from "../../size/Size";

const MenuBox = styled.div`
  position: absolute;
  top: 97px;
  right: ${(props) =>
    props.right && !props.isLibraryOpen
      ? `${Size.ModuleClosed + Size.Margin}px`
      : props.right &&
        props.isLibraryOpen &&
        `${Size.ModuleOpen + Size.Margin}px`};
  left: ${(props: { right: string }) => !props.right && "0px"};
  background: ${Color.White};
  padding-bottom: ${(props) => props.right && "6px"};
  padding-top: 8px;
  height: min-content;
  width: auto;
  min-width: ${(props: { right: string }) =>
    props.right ? Size.ModuleOpen : "271"}px;
  border-style: solid;
  border-color: ${Color.GreyBorder};
  border-width: 0px 0px 1px 1px;
  z-index: 6;
  /* box-shadow: -1px 4px 5px rgba(0, 0, 0, 0.15); */
`;

export default MenuBox;
