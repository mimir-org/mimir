import styled from "styled-components";
import { Color, Size } from "../..";

const MenuBar = styled.div`
  background-color: ${Color.White} !important;
  color: ${Color.Black};
  height: 40px;
  width: auto;
  border-bottom: 1px solid ${Color.Grey};
  position: absolute;
  top: 56px;
  display: inline;
  right: ${(props) =>
    props.isLibraryOpen ? Size.ModuleOpen + Size.Margin : Size.ModuleClosed + Size.Margin}px;
  left: ${(props) =>
    props.isExplorerOpen ? Size.ModuleOpen + Size.Margin : Size.ModuleClosed + Size.Margin}px;
  transition: left 0.3s ease-in-out, right 0.3s ease-in-out;
  z-index: 5;
`;

export default MenuBar;
