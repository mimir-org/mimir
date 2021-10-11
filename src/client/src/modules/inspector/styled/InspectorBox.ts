import styled from "styled-components";
import { Color, Size } from "../../../compLibrary";

interface Props {
  isInspectorOpen: boolean;
  isLibraryOpen: boolean;
  isExplorerOpen: boolean;
  stop: number;
}

const InspectorBox = styled.div<Props>`
  pointer-events: ${(props) => (props.isInspectorOpen ? "initial" : "none")};
  color: ${Color.Black};
  height: ${(props) => props.stop}px;
  max-height: 89vh;
  min-height: ${Size.ModuleClosed}px;
  width: auto;
  min-width: 650px;
  z-index: 5;
  position: absolute;
  bottom: 0;
  overflow-x: auto;
  overflow-y: hidden;
  transition: left 0.2s ease-in-out, right 0.2s ease-in-out;

  right: ${(props) => (props.isLibraryOpen ? Size.ModuleOpen + Size.Margin : Size.ModuleClosed + Size.Margin)}px;
  left: ${(props) => (props.isExplorerOpen ? Size.ModuleOpen + Size.Margin : Size.ModuleClosed + Size.Margin)}px;
`;

export default InspectorBox;
