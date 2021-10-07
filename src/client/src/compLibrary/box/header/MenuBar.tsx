import styled from "styled-components";
import { Color, Size } from "../..";

const MenuBar = styled.div`
  background-color: ${Color.White};
  color: ${Color.Black};
  height: 40px;
  width: auto;
  border-bottom: 1px solid ${Color.Grey};
  position: absolute;
  top: 56px;
  display: inline;
  transition: left 0.2s ease-in-out, right 0.2s ease-in-out;
  z-index: 5;

  right: ${(props: { isLibraryOpen: boolean }) =>
    props.isLibraryOpen ? Size.ModuleOpen + Size.Margin : Size.ModuleClosed + Size.Margin}px;

  left: ${(props: { isExplorerOpen: boolean }) =>
    props.isExplorerOpen ? Size.ModuleOpen + Size.Margin : Size.ModuleClosed + Size.Margin}px;
`;

export default MenuBar;
